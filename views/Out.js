import React, { Component } from 'react'
import { Button, Icon } from 'react-native-elements';
import { View, ImageBackground } from 'react-native'
import { Avatar } from 'react-native-elements';
class Out extends Component {
    Out = () => {
        this.props.navigation.navigate('login');
    }
    render() {
        return (<View>
            <ImageBackground source={require('../img/10.jpeg')} style={{ width: '100%', height: '100%' }}>
                <Avatar
                    size="large"
                    source={{
                        uri:
                            'http://b-ssl.duitang.com/uploads/item/201611/26/20161126191047_4YCdH.jpeg',
                            // showEditButton:true
                    }}
                    containerStyle={{ marginLeft: 160, marginTop: 20 }}
                />
                <View>
                <Button title="退出登录" buttonStyle={{ width: 185, borderStyle: "solid", marginTop: 20, marginLeft: 110,borderRadius: 15, backgroundColor: 'black', }} onPress={this.Out}></Button>
                </View>
            </ImageBackground>

        </View>)
    }
}

export default Out