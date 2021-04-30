import { Component } from "react";
import BaseNumberInput from "./BaseNumberInput";

const DECIMAL = "Décimal";
const BINARY = "Binary";
const ERROR_NAN = "Erreur conversion impossible";
const ERROR_NOT_BINARY = "Erreur conversion impossible";
const ERROR_BASE = "Base non sélectionné";
const EMPTY_STRING = ""
const NO_BASE = "aucune base"

export default class ContainerConvertiseur extends Component{
    constructor(props){
        super(props)
        this.state = {
            base: NO_BASE,
            lastType: EMPTY_STRING,
            number: EMPTY_STRING,
            binary : EMPTY_STRING,
            errorDecimal: EMPTY_STRING,
            errorBinary: EMPTY_STRING,
            errorBase: EMPTY_STRING
        }
        this.handleChoose = this.handleChoose.bind(this);
    }

    binaryToDecimal(binary, base){
        return parseInt(binary, base)
    }

    decimalToBinary(decimal,base){
        return parseInt(decimal).toString(base);
    }

    isBinary(binary, base){
        
        if(isNaN(parseInt(binary, base))){
            return false;
        }else{
            return true;
        }
    }
    handleChoose(e){
        const { value: base} = e.target;
        const { binary, number, lastType} = this.state;
        console.log(base)
        if(base != NO_BASE ){
            this.setState({base: base, errorBase: EMPTY_STRING});
            if(binary != EMPTY_STRING || number != EMPTY_STRING){
                if(!isNaN(parseInt(number)) || !isNaN(parseInt(binary))){
                    if(lastType === DECIMAL){
                        let binary = this.decimalToBinary(number,base);
                    
                        this.setState({number: number, binary: binary ,lastType:DECIMAL,errorDecimal: EMPTY_STRING});
                    }else{
                        if(!this.isBinary(binary[binary.length - 1],base)){
                            this.setState({number: EMPTY_STRING, binary: binary ,errorBinary: ERROR_NOT_BINARY,errorDecimal:EMPTY_STRING})
                        }else{
                            let decimal = this.binaryToDecimal(binary,base);
                    
                            this.setState({number: decimal, binary: binary, lastType:BINARY, errorBinary: EMPTY_STRING})
                        }
                        
                    }
                }else{
                    if(binary != EMPTY_STRING){
                        this.setState({number: EMPTY_STRING, binary: binary ,errorBinary: ERROR_NAN,errorDecimal:EMPTY_STRING})
                    }else{
                        this.setState({number: number,binary: EMPTY_STRING ,errorDecimal: ERROR_NAN,errorBinary: EMPTY_STRING});
                    }
                }
                
            }
        }else{
            this.setState({base: NO_BASE})
        }
        
    }
    handleChange(e){
        const { name ,value } = e.target;
        const { base } = this.state;
        console.log(e.target);

        if(value != EMPTY_STRING && base === NO_BASE){
            this.setState({errorBase: ERROR_BASE});
        }

        if( name === DECIMAL){
            if(isNaN(parseInt(value)) && value != EMPTY_STRING ){
                this.setState({number: value,binary: EMPTY_STRING ,errorDecimal: ERROR_NAN,errorBinary: EMPTY_STRING});
            }else{
                if(value != EMPTY_STRING && base != NO_BASE){
                    
                    let binary = this.decimalToBinary(value,base);
                   
                    this.setState({number: value,binary: binary ,lastType:DECIMAL,errorDecimal: EMPTY_STRING,errorBinary: EMPTY_STRING});
                }else{
                    this.setState({number: value, binary: EMPTY_STRING ,errorDecimal: EMPTY_STRING,errorBinary: EMPTY_STRING})
                }
            }
            
        }else{
            if(isNaN(parseInt(value)) && value != EMPTY_STRING){
                this.setState({number: EMPTY_STRING, binary: value ,errorBinary: ERROR_NAN,errorDecimal:EMPTY_STRING})
            }else if(!this.isBinary(value[value.length - 1],base) && value != EMPTY_STRING){
                this.setState({number: EMPTY_STRING, binary: value ,errorBinary: ERROR_NOT_BINARY,errorDecimal:EMPTY_STRING})
            }
            else{
                console.log("binary")
                if(value != EMPTY_STRING && base != NO_BASE){
                    let decimal = this.binaryToDecimal(value,base);
                    console.log(decimal);
                    this.setState({number: decimal, binary: value, lastType:BINARY, errorBinary: EMPTY_STRING,errorDecimal:EMPTY_STRING})
                }else{
                    this.setState({number: EMPTY_STRING, binary: value ,errorBinary: EMPTY_STRING, errorDecimal:EMPTY_STRING})
                }
                
            }
            
        }
        
        //this.setState({base : base});
    }

    render()    {
        const {number , binary, errorDecimal, errorBinary, errorBase} = this.state;
        const base = [2,3,7,10];
        return(
            <div className="container-fluid mt-5 bg-light text-center border rounded-lg">
                <h1>Convertiseur</h1>
                <div className="container">
                    <label htmlFor="select">Base</label>
                        <select onChange={this.handleChoose} className="form-control" id="base">
                            <option selected value={NO_BASE}>{NO_BASE}</option>
                            {base.map((num,i) => <option key={i} value={num}>{num}</option>)}
                        </select>
                        <div className="mt-3">
                            {errorBase.length ? <small className="alert alert-danger">{errorBase}</small> : ""}
                        </div>
                </div>
                <div className="row">
                    <BaseNumberInput onChangeBase={(e) => this.handleChange(e)} type={DECIMAL} error={errorDecimal} value={number}/>
                    <BaseNumberInput onChangeBase={(e) => this.handleChange(e)} type={BINARY} error={errorBinary} value={binary}/>
                </div>
            </div>
        )
    }
}