console.log('\n' + '%c Stellar v' + stellar.version + ' %c\n' + stellar.github + '\n', 'color:#e8fafe;background:#03c7fa;padding:8px;border-radius:4px', 'margin-top:8px');
// utils
const util = {

  // https://github.com/jerryc127/hexo-theme-butterfly
  diffDate: (d, more = false) => {
    const dateNow = new Date()
    const datePost = new Date(d)
    const dateDiff = dateNow.getTime() - datePost.getTime()
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30

    let result
    if (more) {
      const monthCount = dateDiff / month
      const dayCount = dateDiff / day
      const hourCount = dateDiff / hour
      const minuteCount = dateDiff / minute

      if (monthCount > 12) {
        result = null
      } else if (monthCount >= 1) {
        result = parseInt(monthCount) + ' ' + stellar.config.date_suffix.month
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + ' ' + stellar.config.date_suffix.day
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + ' ' + stellar.config.date_suffix.hour
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + ' ' + stellar.config.date_suffix.min
      } else {
        result = stellar.config.date_suffix.just
      }
    } else {
      result = parseInt(dateDiff / day)
    }
    return result
  },

  copy: (id, msg) => {
    const el = document.getElementById(id);
    if (el) {
      el.select();
      document.execCommand("Copy");
      if (msg && msg.length > 0) {
        hud.toast(msg);
      }
    }
  },

  toggle: (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("display");
    }
  },
}

const hud = {
  toast: (msg, duration) => {
    duration = isNaN(duration) ? 2000 : duration;
    var el = document.createElement('div');
    el.classList.add('toast');
    el.innerHTML = msg;
    document.body.appendChild(el);
    setTimeout(function () {
      var d = 0.5;
      el.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
      el.style.opacity = '0';
      setTimeout(function () { document.body.removeChild(el) }, d * 1000);
    }, duration);
  },

}

// defines

const l_body = document.querySelector('.l_body');

const sidebar = {
  toggle: () => {
    if (l_body) {
      l_body.classList.add('mobile');
      l_body.classList.toggle("sidebar");
    }
  }
}

const init = {
  toc: () => {
    stellar.jQuery(() => {
      const scrollOffset = 32;
      var segs = [];
      $("article.md-text :header").each(function (idx, node) {
        segs.push(node)
      });
      // 定位到激活的目录树（不如pjax体验好）
      // const widgets = document.querySelector('.widgets')
      // const e1 = document.querySelector('.doc-tree-link.active')
      // const offsetTop = e1.getBoundingClientRect().top - widgets.getBoundingClientRect().top - 100
      // if (offsetTop > 0) {
      //   widgets.scrollBy({top: offsetTop, behavior: 'smooth'})
      // }
      // 滚动
      $(document, window).scroll(function (e) {
        var scrollTop = $(this).scrollTop();
        var topSeg = null
        for (var idx in segs) {
          var seg = $(segs[idx])
          if (seg.offset().top > scrollTop + scrollOffset) {
            continue
          }
          if (!topSeg) {
            topSeg = seg
          } else if (seg.offset().top >= topSeg.offset().top) {
            topSeg = seg
          }
        }
        if (topSeg) {
          $("#data-toc a.toc-link").removeClass("active")
          var link = "#" + topSeg.attr("id")
          if (link != '#undefined') {
            const highlightItem = $('#data-toc a.toc-link[href="' + encodeURI(link) + '"]')
            if (highlightItem.length > 0) {
              highlightItem.addClass("active")
              const e0 = document.querySelector('.widgets')
              const e1 = document.querySelector('#data-toc a.toc-link[href="' + encodeURI(link) + '"]')
              const offsetBottom = e1.getBoundingClientRect().bottom - e0.getBoundingClientRect().bottom + 100
              const offsetTop = e1.getBoundingClientRect().top - e0.getBoundingClientRect().top - 64
              if (offsetTop < 0) {
                e0.scrollBy(0, offsetTop)
              } else if (offsetBottom > 0) {
                e0.scrollBy(0, offsetBottom)
              }
            }
          } else {
            $('#data-toc a.toc-link:first').addClass("active")
          }
        }
      })
    })
  },
  sidebar: () => {
    stellar.jQuery(() => {
      $("#data-toc a.toc-link").click(function (e) {
        l_body.classList.remove("sidebar");
      });
    })
  },
  relativeDate: (selector) => {
    selector.forEach(item => {
      const $this = item
      const timeVal = $this.getAttribute('datetime')
      let relativeValue = util.diffDate(timeVal, true)
      if (relativeValue) {
        $this.innerText = relativeValue
      }
    })
  },
  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag: function () {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs .nav-tabs .tab').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        // Prevent selected tab to select again.
        if (element.classList.contains('active')) return;
        // Add & Remove active class on `nav-tabs` & `tab-content`.
        [...element.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === element);
        });
        // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
        const tActive = document.getElementById(element.querySelector('a').getAttribute('href').replace('#', ''));
        [...tActive.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === tActive);
          if (stellar.plugins.echarts) {
            target.querySelectorAll('.echarts-box').forEach(e=>{
              e.firstChild.classList.toggle('active', target === tActive);
            });
          }
        });
        // 自定义
        if (stellar.plugins.copycode) {
          // 修复tab里面display:none时因获取不到宽度而导致位置错误的COPY按钮
          var copybtnNode = tActive.querySelector('.copy-btn');
          if (copybtnNode && !copybtnNode.classList.contains('drew')) {
            const codeElementArr = tActive.querySelectorAll('.code');
            codeElementArr.forEach(code => {
              const codeBeforeWidth = window.getComputedStyle(code, '::before').width.split('px')[0];
              const codeBeforePadding = window.getComputedStyle(code, '::before').padding.split(' ').pop().split('px')[0];
              var codeCopyBtn = code.querySelector('.copy-btn');
              codeCopyBtn.style.right = Number(codeBeforeWidth) + Number(codeBeforePadding) * 2 + 'px';
              codeCopyBtn.classList.add('drew');
            });
          }
        }
        if (stellar.plugins.mermaid) {
          // 修复tab里面display:none时因获取不到宽度而导致宽度错误的mermaid图表，并且只会绘制一次
          var mermaidFirstNode = tActive.querySelector('.mermaid');
          if (mermaidFirstNode && !mermaidFirstNode.classList.contains('drew')) {
            var mermaidNodes = tActive.querySelectorAll('.mermaid');
            alert(mermaidNodes[0].innerHTML);
            mermaid.run({
              suppressErrors: true,
              nodes: mermaidNodes,
            });
            alert('mermaids of in tab第一次渲染！');
            await mermaidNodes.forEach(m=>{
              m.classList.add('drew');
            });
          }
        }
        if (stellar.plugins.echarts) {
          // 修复tab里面display:none时因获取不到宽度而导致位置错误的echarts图表
          var echartsFirstNode = tActive.querySelector('.echarts-box');
          if (echartsFirstNode && !echartsFirstNode.firstChild.classList.contains('drew')) {
            var echartsNode = tActive.querySelectorAll('.echarts-box');
            for (var i = 0; i < echartsNode.length; ++i) {
              echarts.getInstanceByDom(echartsNode[i].firstChild).resize();
            }
            echartsNode.forEach(function (el) {
              el.firstChild.classList.add('drew');
            });
          }
        }
        // Trigger event
        tActive.dispatchEvent(new Event('tabs:click', {
          bubbles: true
        }));
      });
      // 初始化tab下的其他组件
      // if (stellar.plugins.mermaid) {
        // var tabPanes = element.parentNode.nextSibling.querySelectorAll('.tab-pane');
        // // var mNodes = [];
        // tabPanes.forEach(tabPane => {
        //   tabPane.querySelectorAll('.mermaid').forEach(m => {
        //     m.classList.add('intab');
        //     if (tabPane.classList.contains('active')) {
        //       m.classList.add('drew');
        //       alert(tabPane.classList);
        //       alert(tabPane.classList.contains('active'));
        //       // mNodes.push(m);
        //     }
        //   });
        // });
        // mermaid.run({
        //   suppressErrors: true,
        //   nodes: mNodes,
        // })
      // }
      // if (stellar.plugins.echarts) {
      //   var tabPanes = element.parentNode.nextSibling.querySelectorAll('.tab-pane');
      //   tabPanes.forEach(tabPane => {
      //     tabPane.querySelectorAll('.echarts-box').forEach(e => {
      //       e.firstChild.classList.add('intab');
      //       if (tabPane.classList.contains('active')) {
      //         e.firstChild.classList.add('active');
      //         e.firstChild.classList.add('drew');
      //       }
      //     });
      //   });
      // }
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

}


// init
init.toc()
init.sidebar()
init.relativeDate(document.querySelectorAll('#post-meta time'))
init.registerTabsTag()


// mermaid
if (stellar.plugins.mermaid) {

  var tabPanes = document.querySelectorAll('.tab-pane');
  // var mNodes = [];
  tabPanes.forEach(tabPane => {
    tabPane.querySelectorAll('.mermaid').forEach(m => {
      m.classList.add('intab');
      if (tabPane.classList.contains('active')) {
        m.classList.add('drew');
        // mNodes.push(m);
      }
    });
  });

  var firstRender = [];
  var merNodes = document.querySelectorAll('.mermaid');
  for (var i = 0; i < merNodes.length; ++i) {
    // 修改文本内容，主要是mermaid标签中含有<会报错，对'\n'处理是为了与其他标签的处理保持一致，但是不导致报错的后处理
    var mCode = merNodes[i].innerHTML;
    // merNodes[i].innerHTML = mCode.replaceAll('&#60;', '<').split('&#13;').join('\n');
    merNodes[i].innerHTML = mCode.split('&#13;').join('\n');
    // alert(merNodes[i].innerHTML);
    if (!merNodes[i].classList.contains('intab') || merNodes[i].classList.contains('drew')) {
      firstRender.push(merNodes[i]);
    }
  }
  alert(firstRender[0].innerHTML);
  await mermaid.run({
    suppressErrors: true,
    nodes: firstRender,
  });
}

if (stellar.plugins.echarts) {

  var tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(tabPane => {
    tabPane.querySelectorAll('.echarts-box').forEach(e => {
      e.firstChild.classList.add('intab');
      if (tabPane.classList.contains('active')) {
        e.firstChild.classList.add('active');
        e.firstChild.classList.add('drew');
      }
    });
  });

  window.addEventListener("resize", function () {
    var echartsNodes = document.querySelectorAll('.echarts-box');
    for (var i = 0; i < echartsNodes.length; ++i) {
      if (!echartsNodes[i].firstChild.classList.contains('intab') || echartsNodes[i].firstChild.classList.contains('active')) {
        echarts.getInstanceByDom(echartsNodes[i].firstChild).resize();
      }
      if (echartsNodes[i].firstChild.classList.contains('intab') && !echartsNodes[i].firstChild.classList.contains('active')) {
        echartsNodes[i].firstChild.classList.remove('drew');
      }
    }
  });
}

// scrollreveal
if (stellar.plugins.scrollreveal) {
  stellar.loadScript(stellar.plugins.scrollreveal.js).then(function () {
    ScrollReveal().reveal("body .reveal", {
      distance: stellar.plugins.scrollreveal.distance,
      duration: stellar.plugins.scrollreveal.duration,
      interval: stellar.plugins.scrollreveal.interval,
      scale: stellar.plugins.scrollreveal.scale,
      easing: "ease-out"
    });
  })
}

// lazyload
if (stellar.plugins.lazyload) {
  stellar.loadScript(stellar.plugins.lazyload.js, { defer: true })
  // https://www.npmjs.com/package/vanilla-lazyload
  // Set the options globally
  // to make LazyLoad self-initialize
  window.lazyLoadOptions = {
    elements_selector: ".lazy",
  };
  // Listen to the initialization event
  // and get the instance of LazyLoad
  window.addEventListener(
    "LazyLoad::Initialized",
    function (event) {
      window.lazyLoadInstance = event.detail.instance;
    },
    false
  );
  document.addEventListener('DOMContentLoaded', function () {
    window.lazyLoadInstance?.update();
  });
}

// stellar js
if (stellar.plugins.stellar) {
  for (let key of Object.keys(stellar.plugins.stellar)) {
    let js = stellar.plugins.stellar[key];
    if (key == 'linkcard') {
      stellar.loadScript(js, { defer: true }).then(function () {
        setCardLink(document.querySelectorAll('a.link-card[cardlink]'));
      });
    } else {
      const els = document.getElementsByClassName('stellar-' + key + '-api');
      if (els != undefined && els.length > 0) {
        stellar.jQuery(() => {
          stellar.loadScript(js, { defer: true });
          if (key == 'timeline') {
            stellar.loadScript(stellar.plugins.marked);
          }
        })
      }
    }
  }
}

// swiper
if (stellar.plugins.swiper) {
  const swiper_api = document.getElementById('swiper-api');
  if (swiper_api != undefined) {
    stellar.loadCSS(stellar.plugins.swiper.css);
    stellar.loadScript(stellar.plugins.swiper.js, { defer: true }).then(function () {
      const effect = swiper_api.getAttribute('effect') || '';
      var swiper = new Swiper('.swiper#swiper-api', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        effect: effect,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    })
  }
}

// preload
if (stellar.plugins.preload) {
  if (stellar.plugins.preload.service == 'instant_page') {
    stellar.loadScript(stellar.plugins.preload.instant_page, {
      defer: true,
      type: 'module',
      integrity: 'sha384-OeDn4XE77tdHo8pGtE1apMPmAipjoxUQ++eeJa6EtJCfHlvijigWiJpD7VDPWXV1'
    })
  } else if (stellar.plugins.preload.service == 'flying_pages') {
    window.FPConfig = {
      delay: 0,
      ignoreKeywords: [],
      maxRPS: 5,
      hoverDelay: 25
    };
    stellar.loadScript(stellar.plugins.preload.flying_pages, { defer: true })
  }
}

// fancybox
if (stellar.plugins.fancybox) {
  let selector = 'img[fancybox]:not(.error)';
  if (stellar.plugins.fancybox.selector) {
    selector += `, ${stellar.plugins.fancybox.selector}`
  }
  if (document.querySelectorAll(selector).length !== 0) {
    stellar.loadCSS(stellar.plugins.fancybox.css);
    stellar.loadScript(stellar.plugins.fancybox.js, { defer: true }).then(function () {
      Fancybox.bind(selector, {
        groupAll: true,
        hideScrollbar: false,
        Thumbs: {
          autoStart: false,
        },
        caption: function (fancybox, carousel, slide) {
          return slide.$trigger.alt || null
        }
      });
    })
  }
}


if (stellar.search.service) {
  if (stellar.search.service == 'local_search') {
    stellar.jQuery(() => {
      stellar.loadScript('/js/search/local-search.js', { defer: true }).then(function () {
        var $inputArea = $("input#search-input");
        if ($inputArea.length == 0) {
          return;
        }
        var $resultArea = document.querySelector("div#search-result");
        $inputArea.focus(function() {
          var path = stellar.search[stellar.search.service]?.path || '/search.json';
          if (path.startsWith('/')) {
            path = path.substring(1);
          }
          path = stellar.config.root + path;
          const filter = $inputArea.attr('data-filter') || '';
          searchFunc(path, filter, 'search-input', 'search-result');
        });
        $inputArea.keydown(function(e) {
          if (e.which == 13) {
            e.preventDefault();
          }
        });
        var observer = new MutationObserver(function(mutationsList, observer) {
          if (mutationsList.length == 1) {
            if (mutationsList[0].addedNodes.length) {
              $('.search-wrapper').removeClass('noresult');
            } else if (mutationsList[0].removedNodes.length) {
              $('.search-wrapper').addClass('noresult');
            }
          }
        });
        observer.observe($resultArea, { childList: true });
      });
    })
  }
}


// heti
if (stellar.plugins.heti) {
  stellar.loadCSS(stellar.plugins.heti.css);
  stellar.loadScript(stellar.plugins.heti.js, { defer: true }).then(function () {
    const heti = new Heti('.heti');
    
    // Copied from heti.autoSpacing() without DOMContentLoaded.
    // https://github.com/sivan/heti/blob/eadee6a3b748b3b7924a9e7d5b395d4bce479c9a/js/heti-addon.js
    //
    // We managed to minimize the code modification to ensure .autoSpacing()
    // is synced with upstream; therefore, we use `.bind()` to emulate the 
    // behavior of .autoSpacing() so we can even modify almost no code.
    void (function () {
      const $$rootList = document.querySelectorAll(this.rootSelector)

      for (let $$root of $$rootList) {
        this.spacingElement($$root)
      }
    }).bind(heti)();

    stellar.plugins.heti.enable = false;
  });
}

if (stellar.plugins.copycode) {
  stellar.loadScript(stellar.plugins.copycode.js, { defer: true })
}

// 不同浏览器适配 等上述其他js加载完之后加载 涉及ready
stellar.loadScript('/js/plugins/device.js', {defer: true});
