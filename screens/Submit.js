import React, { Component } from 'react'
import { StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Input, Container, Content, Item, Icon, View, Textarea, Button, Text } from 'native-base'

import ImagePicker from 'react-native-image-picker';

export default class Submit extends Component {
    state = {
        isLoading: false,
        title: '',
        description: '',
        image_path: '',
        image_type: '',
        image_fileName: '',

    }
    render() {
        const {
            center,
            hide,
        } = styles
        const { isLoading } = this.state
        const selectPhotoTapped = async () => {
            const options = {
                quality: 1.0,
            };

            ImagePicker.showImagePicker(options, response => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.setState({
                        image_path: response.path,
                        image_type: response.type,
                        image_fileName: response.fileName,
                    })
                }
            });
        }

        const submit = () => {
            // const { title, description, image_path, image_type, image_fileName, } = this.state
            // fetch('https://login.schoolapp.info/api/submit', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         'title': title,
            //         'description': description,
            //         'file': { type: image_type, uri: image_path, name: image_fileName },
            //     }),
            // }).then((response) => response.json())
            //     .then(async (responseJson) => { console.log(responseJson) }).catch(e => console.log(e))
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })

                Alert.alert('Thankyou', 'Your report submitted successfully.')
            }, 3000);

        }
        return (
            <Container>
                <Content padder>
                    <View padder>
                        <Item rounded>
                            <Icon active name='comment-alt' type="FontAwesome5" />
                            <Input
                                placeholder='Title'
                                onChangeText={(title) => this.setState({ title })}
                                value={this.state.title}
                            />
                        </Item>
                    </View>
                    <View padder>
                        <Item rounded>
                            <Icon active name='keyboard' type="FontAwesome5" />
                            <Textarea
                                rowSpan={5}
                                placeholder="Description"
                                onChangeText={(description) => this.setState({ description })}
                                value={this.state.description}
                                numberOfLines={1}
                                style={{ width: Dimensions.get('window').width - 100 }}
                            />
                        </Item>
                    </View>
                    <View padder>
                        <Item rounded>
                            <Button transparent onPress={() => selectPhotoTapped()}>
                                <Icon name='save' type="FontAwesome5" style={{ color: 'black' }} />
                                <Text style={{ color: '#0008', textTransform: 'capitalize', marginLeft: -15 }}>
                                    {this.state.image_fileName.length ? this.state.image_fileName : 'Choose image'}
                                </Text>
                            </Button>
                        </Item>
                    </View>
                    <View padder>
                        <Button block rounded bordered dark onPress={() => submit()}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </Content>
                <ActivityIndicator size="large" style={isLoading ? center : hide} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: 'bold'
    },
    center: {
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: [{ translateX: -50, translateY: -50 }]
    },
    hide: {
        display: 'none',
    },
})