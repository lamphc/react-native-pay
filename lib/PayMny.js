import React, {PropTypes} from 'react'
// import PropTypes from 'prop-types'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native'

import Modalx from '../lib/ModalPlus'
import Password from '../lib/PassWordInput'
let { width, height } = Dimensions.get('window')
const close = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAAAktJREFUaAXtmL9KA0EQxnNHAmmERNDCWrGIPoAWweQF7NIEIgTkOgt7G0XfwCaQFAGFvIE2SeEraOErqGWKQHKc36BnloPcbXZnr3EOktu7m/3z+2ZvZ/YKBTlEAVFAFBAFRAFRQBQQBUSBf6aAZ8Lb6/UuUa9eLBbPu93up0kbWXX6/f7RYrG4hd1NEASTLPvkcz95Q/O6HkXRKTqeDAaDLc062mYQ7jgMw2dUaOB3qF1RMTQCI095nvcGuBo3HEFhfE9oewN9PFSr1XtlvNpFo6lIrZOnCIrgCBKwDdtpmYSqVCpnrVYr1KZRDI3BuOE4oWhsVmBccNxQLGC2cC6g2MBM4VxBsYKtC+cSih1MF841lBOwLLg8oJyBrYJD3NvDs7/gaxOnqI+0w3q5T2t8OBxuz2azMQVx2L0jkO/EGYVLKBqTUzDqgDKU+Xz+guI+XeMYIU1qm2YUP01k/xvlitnNLi3goV3y1PJOoTadTjeVaydFp2C09aAsnaYfRj+inBLnA3hw7GJXoCrkDEyFAhBl6W1KlPOCc/KOpS3p6q4ACr+WSqWm7a5A9VRcZgdLg4o7zQOOFUwHKi84NrB1oPKAYwEzgXINZ70q2kARHC0c6mrJ9Q3FymO2ULHX6KwuKBQSbL+hGINxQsWAnHBGYMngy5nQqokzeQ5Zywk+mH7F8Lpno3cMadKdqyy90+l8lMvl5i8U7QoCXRjVzggMUNfo+ILTU+qgCI48hT6ufN9/VJ9JWRQQBUQBUUAUEAVEAVFAFBAFVijwDRcPB673t1fzAAAAAElFTkSuQmCC'
export default class PayMny extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show,
            over: false,
            blur: false,
            error: ''

        }

        this.passLength = this.props.passWordLen

    }

    static propTypes = {
        show: PropTypes.bool,
        passWordType: PropTypes.string,
        passWordLen: PropTypes.number,
        loadingScale: PropTypes.string,
        lang: PropTypes.object,
        forgetCallBack: PropTypes.func,
        onChange: PropTypes.func
    }

    static defaultProps = {
        show: false,
        passWordLen: 6,
        passWordType: 'numeric',
        loadingScale: 'large',
        lang: {
            title: 'Enter your password',
            forget: 'Forget password ?',

        },
        forgetCallBack: () => { },
        onChange: () => { }
    }


    componentWillReceiveProps(props) {
        console.log('pay------------------100')
        if (!props.hasOwnProperty('show')) {
            return
        }
        this.setState({
            show: props.show
        })


    }

    _invokePay(va) {
        this.setState({show:va})
    }


    _onErrorHandler(err, cb) {
        this.setState({
            over: false,
            blur: false,
            error: err
        })

        let cl = setTimeout(() => {
            clearTimeout(cl)
            this.setState({
                error: ''
            })
        }, 5000)
    }

    _onPassChange(va) {
        if (va && va.toString().length === this.props.passWordLen) {
            let pass
            if (this.props.passWordType === 'numeric') {
                pass = parseInt(va)
            } else if (this.props.passWordType === 'default') {
                pass = va
            }

            if (pass.toString().length !== this.passLength) {
                return
            }
            this.props.onChange && this.props.onChange(pass)
            this.setState({
                over: true,
                blur: true
            })
        }
    }

    _forgetPass() {
        this.props.forgetCallBack()
    }


    _loadingOnSubmit() {
        return (
            this.state.over ? <View style={{ flex: 1 }}>
                <ActivityIndicator
                    style={styles.loading}
                    size={this.props.loadingScale}
                />
            </View> : null
        )
    }

    _closePay() {
        this.setState({ show: false })
    }


    _renderModalContent() {
        return (
            <View style={styles.contentBox}>
                <View style={{ flex: 1 }}>
                    <View style={styles.titleBox}>
                        <TouchableOpacity style={styles.closePayBox} onPress={() => this._closePay()}><Image source={{ uri: close }} style={styles.close} /></TouchableOpacity>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.title}>{this.props.lang.title}</Text>
                        </View>
                    </View>
                    <View style={styles.passBox}>
                        <Password maxLength={this.passLength} blur={this.state.blur} onChange={this._onPassChange.bind(this)}></Password>
                        <View style={styles.tipBox}>
                            <Text style={styles.forErr}>{this.state.error}</Text>
                            <TouchableOpacity onPress={this._forgetPass.bind(this)} style={styles.forget}>
                                <Text style={styles.forTit}>{this.props.lang.forget}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/*loading*/}
                {
                    this._loadingOnSubmit()
                }
            </View>
        )
    }

    render() {

        return (
            <Modalx ref show={this.state.show} content={this._renderModalContent()} />
        )
    }

}

const styles = StyleSheet.create({
    contentBox: { position: 'absolute', top: '30%', bottom: 0, left: 0, right: 0, height: '70%', width: '100%', backgroundColor: '#fff' },
    titleBox: { width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
    close: { width: 28, height: 28 },
    closePayBox: { position: 'relative', left: 10, top: 0, width: 28, height: 28 },
    title: { fontSize: 18, color: '#000', textAlign: 'center', backgroundColor: 'transparent' },
    passBox: { alignItems: 'center', marginTop: 20, paddingHorizontal: 18 },
    tipBox: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
    forget: { flex: 2 },
    forTit: { fontSize: 13, color: '#1890ff', textAlign: 'right' },
    forErr: { flex: 3, color: '#fe3824', fontSize: 13 },
    loading: { height: 80, alignItems: 'center', justifyContent: 'center', padding: 10 }

})