import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text, ScrollView } from 'react-native';
import { Input, Avatar, Button, Header, Divider, Icon, ListItem, ButtonGroup } from 'react-native-elements'
// import { tsInferType } from '@babel/types';
import Picker from 'react-native-picker'
import qs from 'querystring';
// import { Icon } from 'react-native-vector-icons/Foundation';
import Toast from 'react-native-root-toast'
let p1;
class Accounts extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            category: '',
            date: '',
            price: '',
            remark: '',
            income: '',
            record_type: '支出',
            num: 1,
            selectIndex: 0,
            // arry: ['餐饮', '购物', '交通', '烟酒', '社交', '医疗', '学习', '礼物', '宠物']
        }

    }
    goBack = () => {
        this.props.navigation.navigate('home');
    }
    priceChange = (v) => {
        console.log(v)
        this.setState({
            price: this.state.price = v
        })
    }
    remarkChange = (v) => {
        this.setState({
            remark: this.state.remark = v
        })
    }
    componentDidMount() {

    }

    //收入
    selectIncome = () => {
        let data = ['工资', '兼职', '理财', '礼金', '其他']
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: data,
            onPickerConfirm: result => {
                console.log(result)
                this.setState({
                    income: this.state.category = result
                })
            }
        })
        Picker.show()
    }

    //类别选择
    selectCategroy = () => {
        // this.setState({
        //     num:1
        // })
        let data = ['餐饮', '购物', '交通', '烟酒', '社交', '医疗', '学习', '礼物', '宠物']
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: data,
            onPickerConfirm: result => {
                console.log(result)
                this.setState({
                    category: this.state.category = result
                })
            }
        })
        Picker.show()
    }

    //日期选择
    selectDate = () => {
        // this.setState({
        //     num:2
        // })
        let date = []
        let currentDate = new Date()
        let yy = currentDate.getFullYear()
        let mm = currentDate.getMonth() + 1
        let dd = currentDate.getDate()
        for (let y = 2019; y >= 1945; y--) {
            let month = []
            for (let m = 1; m <= 12; m++) {
                let day = []
                if (m === 2) {
                    for (let d = 1; d < 29; d++) {
                        day.push(d)
                    }
                    if (y % 4 === 0) {
                        day.push(29)
                    }
                }
                else if (m in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let d = 1; d < 32; d++) {
                        day.push(d)
                    }
                }
                else {
                    for (let d = 1; d < 31; d++) {
                        day.push(d)
                    }
                }
                let _month = {}
                _month[m] = day
                month.push(_month)
                // month.push()
            }
            date.push({ [y]: month })
        }
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: date,
            selectedValue: [yy, mm, dd],
            onPickerConfirm: result => {
                console.log(result)
                let year = result[0]
                let month = result[1]
                let day = result[2]
                console.log(year, month, day)
                let time = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
                console.log(time)
                this.setState({
                    date: time
                })
            }
        })
        Picker.show()
    }

    //确定
    sure = () => {
        let obj = {
            // income: this.state.income,
            record_type: this.state.record_type,
            item: this.state.category,
            money: this.state.price,
            remark: this.state.remark,
            date: this.state.date
        }
        if(this.state.selectIndex==0){
            obj.record_type="支出"
        }else{
            obj.record_type="收入"
        }
        fetch('http://192.168.0.144:9000/record/add?' + qs.stringify(obj), {
        }).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if (data.code == 2) {
                this.props.navigation.navigate('home'),
                Toast.show('记账成功')
                this.setState({
                    category: '',
                    date: '',
                    price: '',
                    remark: '',
                    record_type: ''
                })
            }
        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }

    //取消
    cancel = () => {
        this.setState({
            category: '',
            date: '',
            price: '',
            remark: '',
            record_type: ''
        })
    }

    //收入和支出
    updateIndex = (index) => {
        // console.log(index)
        // let type = this.state.record_type
        this.state.record_type = '支出'
        if (index == 0) {
            this.state.record_type = '支出'
        } else {
            this.state.record_type = '收入'
        }
        this.setState({
            selectIndex: index,
            record_type: this.state.record_type
        }, () => {
            console.log(this.state.record_type, this.state.selectIndex)
        }
        )
    }


    render() {
        const buttons = ['花费', '收入']
        const selectIndex = this.state.selectIndex
        return (
            <ScrollView>
                <ImageBackground source={require('../img/11.jpeg')} style={{ width: '100%', height: '100%' }}>
                    <Header
                        containerStyle={{
                            backgroundColor: 'black',
                            justifyContent: 'space-around',
                            height: 60,
                        }}
                        centerComponent={{ text: '记账', style: { color: '#fff', fontSize: 19 } }}
                    />
                    <Avatar
                        size="large"
                        source={{
                            uri:
                                'http://b-ssl.duitang.com/uploads/item/201611/26/20161126191047_4YCdH.jpeg',
                        }}
                        containerStyle={{ marginLeft: 160, marginTop: 20 }}
                    />
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40, width: 200, borderRadius: 10, marginLeft: 100,backgroundColor: '#fff' }}
                    />
                    <ScrollView>
                        <Input label="金额" onChangeText={this.priceChange}
                        keyboardType="numeric"
                            leftIcon={
                                <Icon name='free-breakfast' size={24} color='black' />
                            }
                            value={this.state.price}
                        />


                        {this.state.selectIndex == 0 ?

                            <View style={{ flexDirection: 'row' }}>
                                <Input label="花费类别"
                                    leftIcon={
                                        <Icon name='open-with' size={24} color='black' />

                                    }
                                    rightIcon={
                                        <Button title="类别选择" buttonStyle={{width: '60%', borderStyle: "solid", borderRadius: 15,backgroundColor: 'black'}} onPress={this.selectCategroy} />
                                    }
                                >{this.state.category}</Input>


                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Input label="收入类别"
                                    leftIcon={
                                        <Icon name='open-with' size={24} color='black' />
                                    }
                                    rightIcon={
                                        <Button title="类别选择" buttonStyle={{width: '60%',  borderStyle: "solid", borderRadius: 15,backgroundColor: 'black'}} onPress={this.selectIncome} />
                                    }
                                >{this.state.income}</Input>

                            </View>

                        }


                        <View style={{ flexDirection: 'row' }}>
                            <Input label="日期"
                                leftIcon={
                                    <Icon name='update' size={24} color='black' />
                                }
                                rightIcon={
                                    <Button title="日期选择" buttonStyle={{width: '60%',  borderStyle: "solid", borderRadius: 15,backgroundColor: 'black'}} onPress={this.selectDate} />
                                }
                            >{this.state.date}</Input>

                        </View>
                        <Input label="说明" onChangeText={this.remarkChange}
                            leftIcon={
                                <Icon name='rate-review' size={24} color='black' />
                            }
                            value={this.state.remark}
                        />

                        <View style={{ display: "flex", flexDirection: "row", marginLeft: 10,marginTop:20 }}>
                            <Button title="确定" buttonStyle={{ width: 185, borderStyle: "solid", borderRadius: 15, backgroundColor: 'black', }} onPress={this.sure} ></Button>
                            <Button title="取消" buttonStyle={{ width: 185, borderStyle: "solid", borderRadius: 15, backgroundColor: 'black', }} onPress={this.cancel}></Button>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </ScrollView>
        )
    }
}

export default Accounts