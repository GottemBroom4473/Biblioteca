import React, {Component} from "react"
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground,TextInput} from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import * as Permissions from "expo-permissions"
import bancoDados from "./bancoDados"
import firebase from "firebase"

export default class Transacoes extends Component{

constructor(){
    super()
this.state = {
    modo: "normal",
    permissao: null,
    digitalizacao: false,
    idLivroScan: "",
    idPessoaScan: "",
    nomeLivro: "",
    nomeEstudante: ""
}

}

nomeDoLivroBasedId = idLivroScan =>{
    idLivroScan = idLivroScan.trim()
    bancoDados.collection("Livros").where("ID","==",idLivroScan).get().then(snapshot=>{
        snapshot.docs.map(doc=>{this.setState({nomeLivro:doc.data().NomeDoLivro})})
    })
}

nomeDoEstudanteBasedId = idPessoaScan =>{
    idPessoaScan = idPessoaScan.trim()
    bancoDados.collection("Pessoas").where("ID","==",idPessoaScan).get().then(snapshot=>{
        snapshot.docs.map(doc=>{this.setState({nomeEstudante:doc.data().Nome})})
    })
}

    render(){
        var {modo,permissao,digitalizacao,idLivroScan,idPessoaScan} = this.state

        if(modo !== "normal"){
            return(
                <BarCodeScanner onBarCodeScanned={digitalizacao?undefined:
                this.digitalizando}
                style={StyleSheet.absoluteFillObject}
                >

                </BarCodeScanner>
            )
        }

        return(
            <View style={estilo.estilo1}>
                <ImageBackground source ={require("../imagemFundo.jpeg")}
                style={estilo.backgrund}>

            <Image source = {require("../imagemLivro.png")}
            style={estilo.livro}/>

                <TextInput style={estilo.letra} 
                placeholder={"DIGITE O ID DO LIVRO OU DIGITALIZE"}
                placeholderTextColor={"white"}
                value={idLivroScan}
                >
                </TextInput>

                <TouchableOpacity style={estilo.botao} 
                onPress = {()=> this.permissoesDaCamera("idLivroScan")}>
                    <Text style={estilo.letra}>
                        ESCANEAR CODIGO QR
                    </Text>
                </TouchableOpacity>



                <TextInput style={estilo.letra} 
                placeholder={"DIGITE O ID DA PESSOA OU DIGITALIZE"}
                placeholderTextColor={"white"}
                value={idPessoaScan}
                >
                </TextInput>
                <TouchableOpacity style={estilo.botao} 
                onPress = {()=> this.permissoesDaCamera("idPessoaScan")}>
                    <Text style={estilo.letra}>
                        ESCANEAR CODIGO QR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilo.botao}>
                    <Text>
                        CONFIRMAR
                    </Text>
                </TouchableOpacity>

        </ImageBackground>
            </View>
        )
    }

    permissoesDaCamera = async modo=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({permissao:status === "granted", digitalizacao:
         false, modo: modo})
    }

    digitalizando = async({type,data}) =>{
        var {modo} = this.state

        if(modo === "idLivroScan" ){
        this.setState({idLivroScan:data,modo:"normal", digitalizacao:true})
        }

        if( modo === "idPessoaScan"){
        this.setState({idPessoaScan:data,modo:"normal", digitalizacao:true})
        }

    }
}

const estilo = StyleSheet.create({
    estilo1:{
        backgroundColor: "lightblue",
        flex:1,
        justifyContent: "center",
    
    },
    botao:{
        backgroundColor: "red",
        borderRadius: 5,
        fontSize: 10,
        
        color: "black",
        alignSelf: "center",
        width: 110,
        height:60,
        justifyContent: "center",
        alignItens: "center"
        
    },
    letra:{
        fontFamily: "Rajdhani_600SemiBold",
        alignItens: "center",
        borderWidth: 4,
        color: "white",
        backgroundColor:"black"
    },
    backgrund:{
        resizeMode:"cover",
        justifyContent:"center",
        flex:1
    },
    livro:{
        width:150,
        height:150,
        alignItems:"center",
        marginLeft:85,
        marginBottom:200
    }
})