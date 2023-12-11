function init() {
  const mdText = document.querySelector('article.md-text')
  const fullWayFlag = mdText && (mdText.classList.contains('sa-load-hidden') || mdText.classList.contains('blur'))  // 包含这些样式时会导致fixed（要全屏元素的布局）相对mdText（文章容器）定位而不是整个页面，从而出现冲突，此时需要选择方案二来进行页面全屏切换
  const bodyDiv = document.querySelector('body')
  const highlightElementArr = document.querySelectorAll('figure.highlight')
  highlightElementArr.forEach(hl => {
    const code = hl.querySelector('.code')

    const btnDiv = document.createElement('div');
    btnDiv.classList.add('code-btns');

    // fullscreen btn
    const codeFullscreenBtn = document.createElement('div')
    codeFullscreenBtn.classList.add('btn')
    codeFullscreenBtn.classList.add('fullscreen-btn')
    codeFullscreenBtn.innerHTML = `<i class='fa-duotone fa-expand fa-fw'></i><span class="desc">放大</span>`
    if (!fullWayFlag) {
      const codeFullscreenBtnDesc = codeFullscreenBtn.querySelector('span')
      const codeFullscreenBtnIcon = codeFullscreenBtn.querySelector('i')
    }
    codeFullscreenBtn.addEventListener('click', ()=>{
      if (!fullWayFlag) {
        // 方案一：操作更少，速度更快（只是相对方案二而言，实际使用时区别不大）
        stellar.requestAnimationFrame(()=>{
          hl.classList.toggle('fullscreen');
          if (hl.classList.contains('fullscreen')) {
            codeFullscreenBtnIcon.classList.remove('fa-expand');
            codeFullscreenBtnIcon.classList.add('fa-compress');
            codeFullscreenBtnDesc.innerText = '缩小';
            bodyDiv.setAttribute('style', 'overflow:hidden;');
          } else {
            codeFullscreenBtnIcon.classList.remove('fa-compress');
            codeFullscreenBtnIcon.classList.add('fa-expand');
            codeFullscreenBtnDesc.innerText = '放大';
            bodyDiv.removeAttribute('style');
            util.animateOut(hl, "slide-out .5s");
          }
        });
      } else {
        // 方案二：用于启用scroolanimate插件或模糊背景的时候
        document.querySelector('.fullscreen')?.remove();

        let fullEle = hl.cloneNode(true);
        fullEle.classList.add('fullscreen');
        let fullEleCopyBtn = fullEle.querySelector('.copy-btn')
        let fullEleCopyBtnIcon = fullEleCopyBtn.querySelector('i');
        let fullEleCopyBtnDesc = fullEleCopyBtn.querySelector('span');
        fullEleCopyBtn.addEventListener('click', async () => {
          let fullElvCode = fullEle.querySelector('.code')
          let currentCodeElement = fullElvCode.children[0]?.innerText
          await copyCode(currentCodeElement)
    
          fullEleCopyBtnDesc.innerText = stellar.GLOBAL_CONFIG.plugins.copycode.success_text
          fullEleCopyBtn.classList.add('success')
          fullEleCopyBtnIcon.classList.remove('fa-copy')
          fullEleCopyBtnIcon.classList.remove('fa-circle-exclamation')
          fullEleCopyBtnIcon.classList.add('fa-circle-check')
          
          util.messageCopyright()
    
          setTimeout(() => {
            fullEleCopyBtnDesc.innerText = stellar.GLOBAL_CONFIG.plugins.copycode.default_text
            fullEleCopyBtn.classList.remove('success')
            fullEleCopyBtnIcon.classList.remove('fa-check')
            fullEleCopyBtnIcon.classList.add('fa-copy')
          },2000)
        })

        let fullEleFullscreenBtn = fullEle.querySelector('.fullscreen-btn');
        let fullEleFullscreenBtnIcon = fullEleFullscreenBtn.querySelector('i');
        let fullEleFullscreenBtnDesc = fullEleFullscreenBtn.querySelector('span');

        fullEleFullscreenBtn.addEventListener('click', ()=>{
          bodyDiv.removeAttribute('style');
          util.animateOut(fullEle, "slide-out .5s");
        });

        fullEleFullscreenBtnIcon.classList.remove('fa-expand');
        fullEleFullscreenBtnIcon.classList.add('fa-compress');
        fullEleFullscreenBtnDesc.innerText = '缩小';

        bodyDiv.appendChild(fullEle);
        bodyDiv.setAttribute('style', 'overflow:hidden;');

        util.animateIn(fullEle, "slide-in .5s");
      }
    })
    
    btnDiv.appendChild(codeFullscreenBtn);

    // copy btn 
    const codeCopyBtn = document.createElement('div')
    codeCopyBtn.classList.add('btn')
    codeCopyBtn.classList.add('copy-btn')
    codeCopyBtn.innerHTML = `<i class='fa-duotone fa-copy fa-fw'></i><span class="desc">${stellar.GLOBAL_CONFIG.plugins.copycode.default_text}</span>`
    const codeCopyBtnIcon = codeCopyBtn.querySelector('i');
    const codeCopyBtnDesc = codeCopyBtn.querySelector('span');

    btnDiv.appendChild(codeCopyBtn);

    copyCode(codeCopyBtn, code, codeCopyBtnIcon, codeCopyBtnDesc);

    // code-lang
    let langName = hl.getAttribute('class').split(' ')[1]
    const codeLang = document.createElement('div');
    codeLang.classList.add('code-lang');
    codeLang.innerHTML = `<span>${langName}</span>`;

    const codeBtnsAndLang = document.createElement('div');
    codeBtnsAndLang.classList.add('code-btns-and-lang');
    codeBtnsAndLang.appendChild(btnDiv);
    codeBtnsAndLang.appendChild(codeLang);

    // code-tools
    const codeTools = document.createElement('div');
    codeTools.classList.add('code-tools');
    let caption = hl.querySelector('.highlight figcaption');
    if (caption) {
      codeTools.appendChild(caption);
    } else {
      let newFig = document.createElement('figcaption');
      newFig.innerHTML = `<span>${stellar.GLOBAL_CONFIG.config.default.codeblock_figtext}</span>`;
      codeTools.appendChild(newFig);
    }
    codeTools.appendChild(codeBtnsAndLang);

    hl.insertBefore(codeTools, hl.children[0]);

  })
}

// 代码段复制
function copyCode(codeCopyBtn, code, codeCopyBtnIcon, codeCopyBtnDesc) {
  codeCopyBtn.onclick = e => {
    e.stopPropagation();

    code.focus();
    const range = new Range();
    range.selectNodeContents(code);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);

    const str = document.getSelection().toString();
    util.writeClipText(str).then(() => {
      util.messageCopyright();

      codeCopyBtnDesc.innerText = stellar.GLOBAL_CONFIG.plugins.copycode.success_text;
      codeCopyBtn.classList.add('success');
      codeCopyBtnIcon.classList.remove('fa-copy');
      codeCopyBtnIcon.classList.remove('fa-circle-exclamation');
      codeCopyBtnIcon.classList.add('fa-circle-check');

      setTimeout(() => {
        codeCopyBtnDesc.innerText = stellar.GLOBAL_CONFIG.plugins.copycode.default_text
        codeCopyBtn.classList.remove('success')
        codeCopyBtnIcon.classList.remove('fa-check')
        codeCopyBtnIcon.classList.add('fa-copy')
      },2000)
    }).catch(e => {
      codeCopyBtnDesc.innerText = e;
      codeCopyBtn.classList.add('warning');
      codeCopyBtnIcon.classList.remove('fa-copy');
      codeCopyBtnIcon.classList.add('fa-circle-exclamation');

      hud.message('COPY错误', e, {
        icon: 'fa-duotone fa-exclamation-square red',
        displayMode: 1,
        time: 9000
      });

      setTimeout(() => {
        codeCopyBtnDesc.innerText = stellar.GLOBAL_CONFIG.plugins.copycode.default_text;
        codeCopyBtn.classList.remove('warning');
        codeCopyBtnIcon.classList.remove('fa-circle-exclamation');
        codeCopyBtnIcon.classList.add('fa-copy');
      },2000);
    })
  }
}

// 代码段复制
function copyLineCode() {
  document.querySelectorAll('button.copy-btn').forEach(copyBtn=>{
    copyBtn.onclick = e => {
      e.stopPropagation();
  
      const icon = copyBtn.firstChild;
      const copyInput = copyBtn.previousSibling;
      const str = copyInput.value;

      copyInput.focus();
      copyInput.select();

      util.writeClipText(str).then(() => {
        util.messageCopyright();
  
        copyBtn.classList.add('success');
        icon.classList.remove('fa-calendar-lines');
        icon.classList.remove('fa-calendar-xmark');
        icon.classList.add('fa-calendar-check');
  
        setTimeout(() => {
          copyBtn.classList.remove('success')
          icon.classList.remove('fa-calendar-check')
          icon.classList.add('fa-calendar-lines')
        },2000)
      }).catch(e => {
        copyBtn.classList.add('warning');
        icon.classList.remove('fa-calendar-lines');
        icon.classList.add('fa-calendar-xmark');
  
        hud.message('COPY错误', e, {
          icon: 'fa-duotone fa-exclamation-square red',
          displayMode: 1,
          time: 9000
        });
  
        setTimeout(() => {
          copyBtn.classList.remove('warning');
          icon.classList.remove('fa-calendar-xmark');
          icon.classList.add('fa-calendar-lines');
        },2000);
      })
    }
  });
}

init();
copyLineCode();