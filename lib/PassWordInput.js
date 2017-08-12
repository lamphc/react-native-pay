import React, {PropTypes} from 'react'
// import PropTypes from 'prop-types'
import {
    StyleSheet, View, TextInput, Text, TouchableHighlight, InteractionManager
}
    from 'react-native';

export default class PassInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            editable: true
        }
    }

    static propTypes = {
        maxLength: PropTypes.number,
        blur: PropTypes.bool,
        passWordType: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        maxLength: 6,
        blur: false,
        passWordType: 'numeric',
        onChange: () => { }
    }

    componentWillReceiveProps(props) {
        if (props.blur) {
            this.refs.textInput.blur()
            this.setState({ editable: false })
        } else {
            this.setState({ editable: true })
            InteractionManager.runAfterInteractions(() => {
                this._onPress()
            })

        }
    }

    _onPress() {
        if (!this.state.editable) {
            return
        }
        this.refs.textInput.focus()
    }

    _onChange(text) {
        this.setState({ text })
        this.props.onChange(text)
    }


    render() {
        return (
            <TouchableHighlight onPress={this._onPress.bind(this)} activeOpacity={1} underlayColor='transparent'>
                <View style={[styles.container, this.props.style]} >
                    <TextInput ref='textInput'
                        style={styles.inputBehind}
                        maxLength={this.props.maxLength}
                        autoFocus={true}
                        //editable={this.state.editable}
                        keyboardType={this.props.passWordType}//default
                        onChangeText={(text) => { this._onChange(text) }}
                    />
                    {
                        this._getInputItem()
                    }
                </View>
            </TouchableHighlight>
        )

    }
    _getInputItem() {
        let inputItem = [];
        let { text } = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ? <View style={[styles.iconStyle, this.props.iconStyle]}></View> : null}
                    </View>)
            }
            else {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : null}
                    </View>)
            }
            ;
        }
        return inputItem;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: .5,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    inputBehind: { width: 0, height: 0, overflow: 'hidden', position: 'absolute', left: 0, top: 0 },
    inputItem: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: .5,
        borderColor: '#ccc',
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
})