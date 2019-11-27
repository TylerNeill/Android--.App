import React, { Component } from 'react';
import { View, ImageBackground, Text, ScrollView } from 'react-native';
import { Header, Icon, ListItem, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Toast from 'react-native-root-toast'
class Look extends Component {
  constructor() {
    super()

    this.state = {
      date: '',
      date1: '',
      record: [],

    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        // console.debug('didFocus', payload);
        fetch('http://192.168.0.144:9000/record').then(response => response.json()).then(data => {
          console.log('响应的结果：', data);
          list = data.data
          // console.log(list)
          this.setState({ record: data.data }, () => {
            console.log(this.state.record)
          })
        }).catch(err => {
          console.log('请求出错了：', err)
        })
      }
    );

  }
  goBack = () => {
    this.props.navigation.navigate('home');
  }

  //时间筛选
  search = () => {
    var startDate = new Date(this.state.date).getTime()
    var endDate = new Date(this.state.date1).getTime()
    console.log(123);

    fetch(`http://192.168.0.144:9000/record/date?start=${startDate}&end=${endDate}`).then(response => response.json()).then(data => {
      console.log('响应的结果：', data);
      if (data.code == 2) {
        this.setState({
          record: data.data
        })
      }
    }).catch(err => {
      console.log('请求出错了：', err)
    })
  }

  //删除
  del = (id) => {
    console.log(id);

    fetch(`http://192.168.0.144:9000/record/del?id=${id}`).then(response => response.json()).then(data => {
      console.log('响应的结果：', data);
      if (data.code == 2) {
        this.setState({
          record: data.data
        })
        Toast.show('删除成功')
      }
    }).catch(err => {
      console.log('请求出错了：', err)
    })


  }

  render() {
    return (<View>
      <Header
        containerStyle={{
          backgroundColor: 'black',
          justifyContent: 'space-around',
          height: 60,
        }}
        centerComponent={{ text: '查看流水', style: { color: '#fff', fontSize: 19 } }}
      />
      <ImageBackground source={require('../img/11.jpeg')} style={{ width: '100%', height: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <DatePicker
            style={{ width: 170 }}
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
            style={{ width: 170 }}
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

        </View>

        <ScrollView>
          {this.state.record.map((item, index) => {
            return (
              <ListItem
                key={index}
                subtitle={
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.record_type}</Text>
                    <Text>{item.item}</Text>
                    <Text>{item.money}</Text>
                    <Text>{item.date}</Text>
                    <Text>{item.remark}</Text>
                    <Button
                      title='删除'
                      onPress={() => this.del(item.id)}
                    />
                  </View>
                }
              />
            )
          })}
        </ScrollView>
      </ImageBackground>
    </View>)
  }
}

export default Look;