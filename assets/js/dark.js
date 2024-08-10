(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    //获取屏幕宽度并计算比例
    function fontSize(res){
        const clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        if (!clientWidth) return;
        let fontSize = clientWidth / 1920;
        return res*fontSize > 14 ? res*fontSize : 14;
    }    
    echarts.registerTheme('dark', {
        "color": [
            "#dd6b66",
            "#759aa0",
            "#e69d87",
            "#8dc1a9",
            "#ea7e53",
            "#ebcb8b",
            "#73a373",
            "#73b9bc",
            "#7289ab",
            "#91ca8c",
            "#f49f42"
        ],
        // "backgroundColor": "#1c1e21",
        "backgroundColor": "rgba(51,51,51,1)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#cccccc",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "subtextStyle": {
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
        },
        "line": {
            "itemStyle": {
                "borderWidth": 1
            },
            "lineStyle": {
                "width": 2
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": true,
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "radar": {
            "itemStyle": {
                "borderWidth": 1
            },
            "lineStyle": {
                "width": 2
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": true,
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "bar": {
            "itemStyle": {
                "barBorderWidth": "0",
                "barBorderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "pie": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "scatter": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "boxplot": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "parallel": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "sankey": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "funnel": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "gauge": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "candlestick": {
            "itemStyle": {
                "color": "#e43c59",
                "color0": "#91ca8c",
                "borderColor": "#e43c59",
                "borderColor0": "#91ca8c",
                "borderWidth": 1
            },
            "label": {
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "graph": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#b3b3b3"
            },
            "lineStyle": {
                "width": 1,
                "color": "#aaa"
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": true,
            "color": [
                "#dd6b66",
                "#759aa0",
                "#e69d87",
                "#8dc1a9",
                "#ea7e53",
                "#ebcb8b",
                "#73a373",
                "#73b9bc",
                "#7289ab",
                "#91ca8c",
                "#f49f42"
            ],
            "label": {
                "color": "#ffffff",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "map": {
            "itemStyle": {
                "areaColor": "#eee",
                "borderColor": "#444",
                "borderWidth": 0.5
            },
            "label": {
                "color": "#000",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "emphasis": {
                "itemStyle": {
                    "areaColor": "rgba(255,215,0,0.8)",
                    "borderColor": "#444",
                    "borderWidth": 1
                },
                "label": {
                    "color": "rgb(100,0,0)",
                    "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
                }
            }
        },
        "geo": {
            "itemStyle": {
                "areaColor": "#eee",
                "borderColor": "#444",
                "borderWidth": 0.5
            },
            "label": {
                "color": "#000",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "emphasis": {
                "itemStyle": {
                    "areaColor": "rgba(255,215,0,0.8)",
                    "borderColor": "#444",
                    "borderWidth": 1
                },
                "label": {
                    "color": "rgb(100,0,0)",
                    "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#4d4d4d"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#4d4d4d"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#4d4d4d"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#4d4d4d"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#4d4d4d"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "iconStyle": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "type": "scroll",
            "top": "8%",
            "y": "top",
            "x": "center",
            'width': "80%",
            "textStyle": {
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#b3b3b3",
                    "width": "1"
                },
                "crossStyle": {
                    "color": "#b3b3b3",
                    "width": "1"
                }
            },
            "backgroundColor": '#26292c',
            "borderColor": '#383d42',
            'confine': true,
            "extraCssText":'width:fit-content;height:fit-content;box-shadow: none;',
            "textStyle": {
                "color": '#b3b3b3',
                "fontSize": fontSize(14),
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#b3b3b3",
                "width": 1
            },
            "itemStyle": {
                "color": "#dd6b66",
                "borderWidth": 1
            },
            "controlStyle": {
                "color": "#b3b3b3",
                "borderColor": "#b3b3b3",
                "borderWidth": "0.5"
            },
            "checkpointStyle": {
                "color": "#e43c59",
                "borderColor": "#c23531"
            },
            "label": {
                "color": "#b3b3b3",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "emphasis": {
                "itemStyle": {
                    "color": "#a9334c"
                },
                "controlStyle": {
                    "color": "#b3b3b3",
                    "borderColor": "#b3b3b3",
                    "borderWidth": "0.5"
                },
                "label": {
                    "color": "#b3b3b3",
                    "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
                }
            }
        },
        "visualMap": {
            "color": [
                "#bf444c",
                "#d88273",
                "#ebcb8b"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#eeeeee",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            }
        },
        "markPoint": {
            "label": {
                "color": "#ffffff",
                "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
            },
            "emphasis": {
                "label": {
                    "color": "#ffffff",
                    "fontFamily": 'LXGW WenKai Screen,Menlo,Monaco,Consolas,system-ui,"Courier New",monospace,sans-serif'
                }
            }
        }
    });
}));
