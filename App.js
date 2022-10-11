import React, {Component} from "react"
import {View, Text} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Transacoes from "./telas/transacoes"
import Pesquisas from "./telas/pesquisas"
import {Rajdhani_600SemiBold} from "@expo-google-fonts/rajdhani"
import * as Font from "expo-font"

const Tab = createBottomTabNavigator()

export default class App extends Component{

    constructor(){
        super()
        this.state = {
            fonteCarregou: false
        }
    }
    render(){
        if(this.state.fonteCarregou === true){

        
        return(
            <NavigationContainer>
              <Tab.Navigator>
          <Tab.Screen  name = "INICIO"  component = {Transacoes}>
          </Tab.Screen>

          <Tab.Screen  name = "PESQUISAR"  component = {Pesquisas}>
          </Tab.Screen>

              </Tab.Navigator>
            </NavigationContainer>
        )
        }
        return null
    }

    async carregarFonte(){
    await Font.loadAsync({Rajdhani_600SemiBold: Rajdhani_600SemiBold})
    this.setState({fonteCarregou:true})
    }
    componentDidMount(){
        this.carregarFonte();
    }
}
