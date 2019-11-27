import React,{Component} from 'react'

import {View,Text,Image,ImageBackground} from 'react-native'

class Welcome extends Component{
    render(){
        return (
        // <View>
        //     <Image source={require('../img/bg.jpg')}/>
        // </View>
        <ImageBackground source={require('../img/3.png')} style={{width: '100%', height: '100%'}}>
      </ImageBackground>
        )
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('login')
        },3000)
    }
}

export default Welcome;