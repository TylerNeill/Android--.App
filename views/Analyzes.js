import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { Input, Avatar, Button, Header, Divider, Icon, ButtonGroup } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Echarts from 'native-echarts';
import 'jquery'
import qs from 'querystring';
class Analyzes extends Component {
    constructor() {
        super()
        this.state = {
            date: '',
            date1: '',
            rep: [],//柱状图
            record: [],//支出的饼图数据
            record1: [],//收入的饼图数据
            selectIndex: 0,//收入或者支出的按钮组索引值
            selectIndex1: 0,//饼图或者柱状图的按钮组索引值
        }
    }
    goBack = () => {
        this.props.navigation.navigate('home');
    }

    //收入和支出
    updateIndex = (index) => {
        // console.log(index)
        // let type = this.state.record_type
        if (index == 0) {
            this.state.record_type = '支出'

        } else {
            this.state.record_type = '收入'
        }
        this.setState({
            selectIndex: index,
            record_type: this.state.record_type,


        }, () => {
            console.log(this.state.record_type, this.state.selectIndex)
        }
        )
        fetch('http://192.168.0.144:9000/record').then(response => response.json()).then(data => {
            if (data.code == 2) {
                if (this.state.selectIndex == 0) {
                    let expend = data.data
                    var ex = []
                    for (let n = 0; n < expend.length; n++) {
                        if (expend[n].record_type == '支出') {
                            ex.push(expend[n])
                        }
                    }
                    let newExpend = ex.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.item && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record: newExpend
                    })
                } else {

                    let income = data.data
                    var ic = []
                    for (let m = 0; m < income.length; m++) {
                        if (income[m].record_type == '收入') {
                            ic.push(income[m])
                        }
                    }
                    let newIncome = ic.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.itemm && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record1: newIncome
                    })
                }
                if (this.state.selectIndex1 == 1) {
                    let bar = data.data.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.record_type === cur.record_type && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])
                    this.setState({
                        rep: bar
                    }, () => {
                        console.log(this.state.rep, '1111');
                    })
                }
            }

        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }

    //图标类型
    updateIndex1 = (index) => {
        this.setState({
            selectIndex1: index
        })
        fetch('http://192.168.0.144:9000/record')
        .then(response => response.json()).then(data => {
            this.setState({
                rep: data.data
            })
        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                // console.debug('didFocus', payload);
                this.props.navigation.addListener(
                    'didFocus',
                    payload => {
                        // console.debug('didFocus', payload);
                        fetch('http://192.168.0.144:9000/record').then(response => response.json()).then(data => {
                            if (data.code == 2) {
                                if (this.state.selectIndex == 0) {
                                    let expend = data.data
                                    var ex = []
                                    for (let n = 0; n < expend.length; n++) {
                                        if (expend[n].record_type == '支出') {
                                            ex.push(expend[n])
                                        }
                                    }
                                    let newExpend = ex.reduce((prev, cur) => {
                                        let i = -1
                                        i = prev.findIndex(item => item.item === cur.item && item.date === cur.date)
                                        if (i != -1) {
                                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                                        } else {
                                            prev.push(cur)
                                        }
                                        return prev
                                    }, [])

                                    this.setState({
                                        record: newExpend
                                    })
                                } else {

                                    let income = data.data
                                    var ic = []
                                    for (let m = 0; m < income.length; m++) {
                                        if (income[m].record_type == '收入') {
                                            ic.push(income[m])
                                        }
                                    }
                                    let newIncome = ic.reduce((prev, cur) => {
                                        let i = -1
                                        i = prev.findIndex(item => item.item === cur.itemm && item.date === cur.date)
                                        if (i != -1) {
                                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                                        } else {
                                            prev.push(cur)
                                        }
                                        return prev
                                    }, [])

                                    this.setState({
                                        record1: newIncome
                                    })
                                }
                                if (this.state.selectIndex1 == 1) {
                                    let bar = data.data.reduce((prev, cur) => {
                                        let i = -1
                                        i = prev.findIndex(item => item.record_type === cur.record_type && item.date === cur.date)
                                        if (i != -1) {
                                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                                        } else {
                                            prev.push(cur)
                                        }
                                        return prev
                                    }, [])
                                    this.setState({
                                        rep: bar
                                    }, () => {
                                        console.log(this.state.rep, '1111');
                                    })
                                }
                            }

                        }).catch(err => {
                            console.log('请求出错了：', err)
                        })
                    }
                );
            })
    }
    //筛选
    search = () => {
        var startDate = new Date(this.state.date).getTime()
        var endDate = new Date(this.state.date1).getTime()
        let obj = {
            start: startDate,
            end: endDate
        }
        fetch(`http://192.168.0.144:9000/record/date?start=${startDate}&end=${endDate}`).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if (data.code == 2) {
                if (this.state.selectIndex == 0) {
                    let expend = data.data
                    var ex = []
                    for (let n = 0; n < expend.length; n++) {
                        if (expend[n].record_type == '支出') {
                            ex.push(expend[n])
                        }
                    }
                    let newExpend = ex.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.item && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record: newExpend
                    })
                } else {

                    let income = data.data
                    var ic = []
                    for (let m = 0; m < income.length; m++) {
                        if (income[m].record_type == '收入') {
                            ic.push(income[m])
                        }
                    }
                    let newIncome = ic.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.itemm && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record1: newIncome
                    })
                }
                if (this.state.selectIndex1 == 1) {
                    let bar = data.data.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.record_type === cur.record_type && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])
                    this.setState({
                        rep: bar
                    }, () => {
                        console.log(this.state.rep, '1111');
                    })
                }
            }

        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }
    render() {
        // 饼状形
        let data = []
        let data1 = []
        {
            this.state.record.map((item, index) => {
                data.push({
                    value: item.money,
                    name: item.item
                })
            })
        }
        {
            this.state.record1.map((item, index) => {
                data1.push({
                    value: item.money,
                    name: item.item
                })
            })
        }
        let option = {
            tooltip: {},
            series: [{
                name: '花费',
                type: 'pie',
                hoverAnimation: true,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                data: data

            }]
        }
        let option2 = {
            tooltip: {},
            series: [{
                name: '收入',
                type: 'pie',
                hoverAnimation: true,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                data: data1

            }]
        }

        // 柱状形
        let barxAxis = []
        let barExpend = []
        let barIncome = []
        {
            this.state.rep.map((item, index) => {
                barxAxis.push(item.date)
            })
        }
        {
            this.state.rep.map((item, index) => {
                if (item.record_type == '支出') {
                    barExpend.push(item.money)
                }
            })
        }
        {
            this.state.rep.map((item, index) => {
                if (item.record_type == '收入') {
                    barIncome.push(item.money)
                }
            })
        }
        let option1 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['花费', '收入']
            },
            xAxis: {
                data: barxAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '花费',
                    type: 'bar', // 柱状
                    data: barExpend

                },
                {
                    name: '收入',
                    type: 'bar', // 柱状
                    data: barIncome
                }
            ]
        };
        const buttons = ['支出', '收入']
        const buttons1 = ['饼状', '柱状图']
        const selectIndex = this.state.selectIndex
        const selectIndex1 = this.state.selectIndex1
        return (
            <View>
                <Header
                    containerStyle={{
                        backgroundColor: 'black',
                        justifyContent: 'space-around',
                        height: 60,
                    }}
                    centerComponent={{ text: '分析报告', style: { color: '#fff', fontSize: 19 } }}
                />
                <View style={{ flexDirection: 'row' }}>

                    <DatePicker
                        style={{ width: 120 }}
                        date={this.state.date}
                        mode='date'
                        placeholder='请选择时间'
                        format='YYYY-MM-DD'
                        confirmBtnText='确定'
                        cancelBtnText='取消'
                        customStyles={{
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <DatePicker
                        style={{ width: 90 }}
                        date={this.state.date1}
                        mode='date'
                        placeholder='请选择时间'
                        format='YYYY-MM-DD'
                        confirmBtnText='确定'
                        cancelBtnText='取消'
                        customStyles={{
                            dateIcon: {
                                width: 0,
                                height: 0
                            },
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date1) => { this.setState({ date1: date1 }) }}
                    />
                    <Icon
                        name='search'
                        onPress={this.search}
                    />
                    {/* 饼图.柱状图 */}
                    <ButtonGroup
                        onPress={this.updateIndex1}
                        selectedIndex={selectIndex1}
                        buttons={buttons1}
                        containerStyle={{ height: 30, borderRadius: 5, width: 150 }}
                    />

                </View>
                {this.state.selectIndex1 == 0 ?
                    (this.state.selectIndex == 0 ? <View><ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40, width: 200, marginLeft: 100, borderRadius: 10 }}
                    />
                        <Echarts option={option} width={400} height={400} />
                    </View> : <View><ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40, width: 200, marginLeft: 100, borderRadius: 10 }}
                    />
                            <Echarts option={option2} width={400} height={400} />

                        </View>)
                    : <Echarts option={option1} width={500} height={500} />}
            </View>
        )
    }
}

export default Analyzes