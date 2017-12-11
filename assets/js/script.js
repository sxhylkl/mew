/*-----------------------
mew
js
version  0.0.1
author   esun
 ----------------------*/
var nulData = [];
var categories = [];

var defaultxAxis = {
    type: 'category',
    axisLabel: {
        interval: 0,
    },
    data: nulData
};

var defaultyAxis = {
    type: 'value',
    name: '%利用率',
    max: 100
};

var barItemStyle = {
    normal: {
        label: {
            show: true,
            formatter: function (p) {
                return p.value > 0 ? (p.value + "%") : '';
            }
        }
    }
};

var assetsOption = {
    title: {
        text: '资产统计',
        subtext: '共0台',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} 台({d}%)"
    },
    legend: {
        left: 0,
        orient: 'vertical',
        data: nulData
    },
    calculable: true,
    series: [
        {
            name: '资产统计服务',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: '{b}:{c}'
                    },
                    labelLine: {show: true}
                }
            },
            data: nulData
        }
    ]
};

var flowOption = {
    grid: {
        top: 80
    },
    title: {
        text: '流量服务',
        left: '50%',
        textAlign: 'center'
    },
    tooltip: {
        trigger: 'axis',
        padding: [5, 10]
    },
    legend: {
        left: 0,
        orient: 'vertical',
        data: ['流入', '流出']
    },
    xAxis: {
        name: '秒',
        type: 'category',
        boundaryGap: false,
        data: ['0', '10', '20', '30', '40', '50', '60'],
        splitLine: {
            interval: 'auto'
        }
    },
    yAxis: {
        name: 'M/秒',
        type: 'value'
    },
    series: [
        {
            name: '流入',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: nulData,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(199, 237, 250,0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(199, 237, 250,0.2)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#FE8463'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }, {
            name: '流出',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: nulData,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(216, 244, 247,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(216, 244, 247,1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#58c8da'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }
    ]
};

var cpuOption = {
    title: {
        text: 'cpu使用率'
    },
    xAxis: defaultxAxis,
    yAxis: defaultyAxis,
    series: [{
        type: 'bar',
        itemStyle: barItemStyle,
        data: nulData
    }]
};

var ramOption = {
    title: {
        text: '内存使用率'
    },
    xAxis: defaultxAxis,
    yAxis: defaultyAxis,
    series: [{
        type: 'bar',
        itemStyle: barItemStyle,
        data: nulData
    }]
};

var diskOption = {
    title: {
        text: '硬盘使用率'
    },
    xAxis: defaultxAxis,
    yAxis: defaultyAxis,
    legend: {
        data: ['已使用', '未使用'],
        selected: false,
        right: 20
    },
    series: [
        {
            name: "已使用",
            type: "bar",
            stack: "总量",
            itemStyle: barItemStyle,
            data: nulData
        },
        {
            name: "未使用",
            type: "bar",
            stack: "总量",
            data: nulData
        }
    ]
};

var topOption = {
    tooltip: {
        //formatter:'{b}:{c}'
        formatter: function (params) {
            if (params.dataType == "node") {
                if(params.name!=""){
                    return params.name +':'+ params.value;
                }
            }else if(params.dataType=="edge"){
                return '流量:'+ params.value;
            }
            return '';//params.name;
        }
    },
    legend: [{
        right: 20,
        data: nulData
    }],
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 2500,
            //edgeLength: 300
        },
        edgeLabel:{
            normal:{
                show:true,
                fontSize: 12,
                formatter: function(params){return params.value;}
            }
        },
        data: nulData,
        links: nulData,
        categories: nulData,
        focusNodeAdjacency: true,
        symbolSize: [80,80],
        roam: true,//是否开启滚轮缩放和拖拽漫游
        label: {
            normal: {
                show: true,
                color: '#fff',
                position: 'bottom',
                formatter: function(params){return params.name!=''?params.name+'\n('+params.value+')':'';},//'{b}\n({c})'
                fontSize: 14,
                fontStyle: '600',
            }
        },
        lineStyle: {
            normal: {
                show: true,
                width: 6,
                color: '#fff',
                curveness: 0,
                type: "solid"
            }
        }
    }]
};

var curTheme = {
    // 全图默认背景
    //backgroundColor: '#1b1b1b',

    // 默认色板
    color: [
        '#FE8463', '#9BCA63', '#FAD860', '#60C0DD',
        '#0084C6', '#D7504B', '#C6E579', '#26C0C0',
        '#F0805A', '#F4E001', '#B5C334'
    ],

    // 图表标题
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#fff'          // 主标题文字颜色
        }
    },

    // 图例
    legend: {
        textStyle: {
            color: '#ccc'          // 图例文字颜色
        }
    },

    // 值域
    dataRange: {
        itemWidth: 15,
        color: ['#FFF808', '#21BCF9'],
        textStyle: {
            color: '#ccc'          // 值域文字颜色
        }
    },

    toolbox: {
        color: ['#fff', '#fff', '#fff', '#fff'],
        effectiveColor: '#FE8463',
        disableColor: '#666'
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(250,250,250,0.8)',     // 提示背景颜色，默认为透明度为0.7的黑色
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {          // 直线指示器样式设置
                color: '#aaa'
            },
            crossStyle: {
                color: '#aaa'
            },
            shadowStyle: {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        },
        textStyle: {
            color: '#333'
        }
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#555',            // 数据背景颜色
        fillerColor: 'rgba(200,200,200,0.2)',   // 填充颜色
        handleColor: '#eee'     // 手柄颜色
    },

    // 网格
    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            show: false,
            lineStyle: {
                color: ['#ccc']
            }
        },
        axisTick: {            // 坐标轴小标记
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#ccc'
            }
        },
        splitLine: {           // 分隔线
            show: false,
            lineStyle: {
                color: ['#ccc']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#ccc',
                width: 0
            }
        },
        axisTick: {            // 坐标轴小标记
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#ccc'
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#ccc'],
                type: 'dashed'
            }
        },
        splitArea: {           // 分隔区域
            show: false
        }
    },

    polar: {
        name: {
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#ccc'
            }
        },
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#ddd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)']
            }
        },
        splitLine: {
            lineStyle: {
                color: '#ddd'
            }
        }
    },

    timeline: {
        label: {
            textStyle: {
                color: '#ccc'
            }
        },
        lineStyle: {
            color: '#aaa'
        },
        controlStyle: {
            normal: {color: '#fff'},
            emphasis: {color: '#FE8463'}
        },
        symbolSize: 3
    },

    // 折线图默认参数
    line: {
        smooth: true
    },

    // K线图默认参数
    k: {
        itemStyle: {
            normal: {
                color: '#FE8463',       // 阳线填充颜色
                color0: '#9BCA63',      // 阴线填充颜色
                lineStyle: {
                    width: 1,
                    color: '#FE8463',   // 阳线边框颜色
                    color0: '#9BCA63'   // 阴线边框颜色
                }
            }
        }
    },

    // 雷达图默认参数
    radar: {
        symbol: 'emptyCircle',    // 图形类型
        symbolSize: 3
        //symbol: null,         // 拐点图形类型
        //symbolRotate : null,  // 图形旋转控制
    },

    pie: {
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)'
            },
            emphasis: {
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 1)'
            }
        }
    },

    map: {
        itemStyle: {
            normal: {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        // color: '#ccc'
                    }
                }
            },
            emphasis: {                 // 也是选中样式
                areaStyle: {
                    color: '#FE8463'
                },
                label: {
                    textStyle: {
                        // color: 'ccc'
                    }
                }
            }
        }
    },

    force: {
        itemStyle: {
            normal: {
                linkStyle: {
                    color: '#fff'
                }
            }
        }
    },

    chord: {
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: 'rgba(228, 228, 228, 0.2)',
                chordStyle: {
                    lineStyle: {
                        color: 'rgba(228, 228, 228, 0.2)'
                    }
                }
            },
            emphasis: {
                borderWidth: 1,
                borderColor: 'rgba(228, 228, 228, 0.9)',
                chordStyle: {
                    lineStyle: {
                        color: 'rgba(228, 228, 228, 0.9)'
                    }
                }
            }
        }
    },

    gauge: {
        axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
                color: [[0.2, '#9BCA63'], [0.8, '#60C0DD'], [1, '#D7504B']],
                width: 3,
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            }
        },
        axisTick: {            // 坐标轴小标记
            length: 15,        // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            }
        },
        axisLabel: {            // 坐标轴小标记
            textStyle: {       // 属性lineStyle控制线条样式
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            }
        },
        splitLine: {           // 分隔线
            length: 25,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            }
        },
        pointer: {           // 分隔线
            shadowColor: '#fff', //默认透明
            shadowBlur: 5
        },
        title: {
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            }
        },
        detail: {
            shadowColor: '#fff', //默认透明
            shadowBlur: 5,
            offsetCenter: [0, '50%'],       // x, y，单位px
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
            }
        }
    },

    funnel: {
        itemStyle: {
            normal: {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1
            },
            emphasis: {
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    },

    noDataLoadingOption:{
        text:'数据加载中...',
        effect:'whirling'
    },
    loadingText : '数据加载中...',
    loadingEffect: 'whirling'
};