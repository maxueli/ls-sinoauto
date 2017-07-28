export const sliderlist = [
    {
        "name": "客户接待",
        "ulclass": "usergl",
        "ischild": true,
        "url": "",
        "iocn": "fa-handshake-o",
        "children": [
            {
                "name": "工单查询",
                "ischild": false,
                "url": "/pages/userService/gdselect",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "创建工单",
                "ischild": false,
                "url": "/pages/userService/creatgd",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "维修派工",
                "ischild": false,
                "url": "/pages/userService/Maintenancework",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "维修增项",
                "ischild": false,
                "url": "/pages/userService/Maintenanceincrement",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "维修结算",
                "ischild": false,
                "url": "/pages/userService/Maintenancesettlement",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }, {
        "name": "车间管理",
        "ulclass": "workshop",
        "ischild": true,
        "url": "",
        "iocn": "fa-building",
        "children": [
            {
                "name": "维修派工",
                "ischild": false,
                "url": "/pages/workshopmanage/maintenancework",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "维修验收",
                "ischild": false,
                "url": "/pages/workshopmanage/maintenanceaccept",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }, {
        "name": "配件管理",
        "ulclass": "partsmanage",
        "ischild": true,
        "url": "",
        "iocn": 'fa-wrench',
        "children": [
            {
                "name": "配件和工具",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "tools",
                "children": [
                    {
                        "name": "仓库定义",
                        "ischild": false,
                        "url": "/pages/partsManage/tools/warehouse",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }
                ]
            }, {
                "name": "配件售价查询",
                "ischild": false,
                "url": "/pages/partsManage/priceinquiry",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "库存管理",
                "ischild": false,
                "url": "/pages/partsManage/stockmanage",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "配件出库",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "partsout",
                "children": [
                    {
                        "name": "维修领料",
                        "ischild": false,
                        "url": "/pages/partsManage/partsout/maintenance",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "销售出库",
                        "ischild": false,
                        "url": "/pages/partsManage/partsout/sellout",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "内部领料",
                        "ischild": false,
                        "url": "/pages/partsManage/partsout/intermaterial",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "采购退库",
                        "ischild": false,
                        "url": "/pages/partsManage/partsout/purchansreturn",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }
                ]
            }, {
                "name": "配件入库",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "partsin",
                "children": [
                    {
                        "name": "维修退料",
                        "ischild": false,
                        "url": "/pages/partsManage/partsin/maintenanceunmaterial",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "销售退库",
                        "ischild": false,
                        "url": "/pages/partsManage/partsin/sellin",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "内部退料",
                        "ischild": false,
                        "url": "/pages/partsManage/partsin/interunmaterial",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }, {
                        "name": "采购入库",
                        "ischild": false,
                        "url": "/pages/partsManage/partsin/purchansin",
                        "iocn": "",
                        "ulclass": "",
                        "children": []
                    }
                ]
            }, {
                "name": "盘点清单",
                "ischild": false,
                "url": "/pages/partsManage/inventorycount",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "配件流水",
                "ischild": false,
                "url": "/pages/partsManage/partsflow",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "供应商管理",
                "ischild": false,
                "url": "/pages/partsManage/supplier",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }, {
        "name": "客户管理",
        "ischild": true,
        "url": "",
        "iocn": "fa-users",
        "ulclass": "customermanage",
        "children": [
            {
                "name": "客户信息",
                "ischild": false,
                "url": "/pages/customerManage/customerinfo",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }, {
        "name": "财务管理",
        "ischild": true,
        "url": "",
        "iocn": "fa-gg",
        "ulclass": "financemanage",
        "children": [
            {
                "name": "维修收银",
                "ischild": false,
                "url": "/pages/financeManage/maintenancecashier",
                "iocn": "",
                "ulclass": "",
                "children": []
            },
            {
                "name": "销售收银",
                "ischild": false,
                "url": "/pages/financeManage/sellcashier",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }, {
        "name": "报表管理",
        "ischild": true,
        "url": "",
        "iocn": "fa-table",
        "ulclass": "reportmanage",
        "children": [
            {
                "name": "经营管理",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "manageanlysis",
                "children": [
                    {
                        "name": "产值汇总",
                        "ischild": false,
                        "url": "/pages/reportManage/manageanlysis/outputsummary",
                        "ulclass": "",
                        "iocn": "",
                        "children": []
                    }
                ]
            }, {
                "name": "维修报表",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "repairreport",
                "children": [
                    {
                        "name": "维修历史",
                        "ischild": false,
                        "url": "/pages/reportManage/repairreport/repairhistory",
                        "ulclass": "",
                        "iocn": "",
                        "children": []
                    }
                ]
            }, {
                "name": "配件报表",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "partsreport",
                "children": [
                    {
                        "name": "出入库统计",
                        "ischild": true,
                        "url": "",
                        "iocn": "",
                        "ulclass": "outinstat",
                        "children": [
                            {
                                "name": "采购入库统计",
                                "ischild": false,
                                "url": "/pages/reportManage/partsreport/outinstat/purchasinstat",
                                "ulclass": "",
                                "iocn": "",
                                "children": []
                            }, {
                                "name": "维修发料统计",
                                "ischild": false,
                                "url": "/pages/reportManage/partsreport/outinstat/maintenancematerialstat",
                                "ulclass": "",
                                "iocn": "",
                                "children": []
                            }, {
                                "name": "配件销售统计",
                                "ischild": false,
                                "url": "/pages/reportManage/partsreport/outinstat/partssellstat",
                                "ulclass": "",
                                "iocn": "",
                                "children": []
                            }, {
                                "name": "内部领料统计",
                                "ischild": false,
                                "url": "/pages/reportManage/partsreport/outinstat/interpicking",
                                "ulclass": "",
                                "iocn": "",
                                "children": []
                            }, {
                                "name": "进销存汇总",
                                "ischild": false,
                                "url": "/pages/reportManage/partsreport/outinstat/invoicingsummary",
                                "ulclass": "",
                                "iocn": "",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }, {
        "name": "系统管理",
        "ischild": true,
        "url": "",
        "iocn": "fa-cog",
        "ulclass": "systemmanage",
        "children": [
            {
                "name": "用户安全",
                "ischild": true,
                "url": "",
                "iocn": "",
                "ulclass": "usersava",
                "children": [
                    {
                        "name": "用户管理",
                        "ischild": false,
                        "url": "/pages/systemManage/usersave/usermanage",
                        "ulclass": "",
                        "iocn": "",
                        "children": []
                    }
                ]
            },
            {
                "name": "门店管理",
                "ischild": false,
                "url": "/pages/systemManage/stroemanage",
                "iocn": "",
                "ulclass": "",
                "children": []
            }, {
                "name": "门店添加",
                "ischild": false,
                "url": "/pages/systemManage/storeadd",
                "iocn": "",
                "ulclass": "",
                "children": []
            }
        ]
    }
]