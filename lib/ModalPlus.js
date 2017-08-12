import React, {PropTypes} from 'react'
// import PropTypes from 'prop-types'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native'



export default class Modalx extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: this.props.show

        }
    }

    static propTypes = {
        show: PropTypes.bool,
        onModalClose: PropTypes.func
    }

    static defaultProps = {
        show: false,
        onModalClose: () => { }
    }


    componentWillReceiveProps(props) {
        if (props.hasOwnProperty('show') && (this.state.show !== props.show)) {
            this.setState({
                show: props.show
            })
        }
    }

    _setModalVisible(va, cb) {
        this.setState({ show: va }, () => {
            cb && cb()
            if (!va) {
                this._onModalClose()
            }
        })

    }

    _onModalClose() {
        this.props.onModalClose && this.props.onModalClose()
    }

    _renderDefaultContent() {
        let height = 100, top = (Dimensions.get('window').height - height) / 2
        return (
            <View style={[styles.contentBox, { height: height, top: top }]}>
                <Text>Best Guy!</Text>
            </View>

        )
    }

    render() {

        return (
            <Modal
                animationType={this.props.animationType || "slide"}
                transparent={true}
                visible={this.state.show}
                onRequestClose={() => { }}
            >
                <TouchableOpacity style={styles.shandowBox} onPress={() => { this._setModalVisible(false) }} />
                {
                    this.props.content ? this.props.content : this._renderDefaultContent()
                }
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    contentBox: {
        position: 'absolute', top: '25%', zIndex: 100, marginHorizontal: '10%', width: '80%', height: '50%', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 30
    },
    shandowBox: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)'
    }
})