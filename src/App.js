import './App.css';
import React from 'react'
import $ from 'jquery'
import { setDocument, getDocument, updateDocx } from './firemodel'



class FireCounter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0,
    }
  }



  getCount = async() => {
    const counterSnapshot = await getDocument();
    if (counterSnapshot.exists()) {
      const count = counterSnapshot.data().count
      return count;
    } else {
      console.log("counter doesn't exists");
      return null;
    }
  }

  sendMessage = async(count) => {
    const response = await $.get(`api/message/send?count=${count}`);
    console.log(response);
  }

  addCount = async(event) => {
    let count = await this.getCount(); //much faster this.state.count, but what if you are not connected to the web.
    if (count === null) {
      count = 0;
    } else {
      switch (event.target.id){
        case 'increment':
          count +=1;
          break;
        case 'decrement':
          count -=1
          break;
        case 'reset':
          count *= 0;
          break;
        default:
          break;
       }
       if (count%10===0 && count>0) {
         console.log(count);
          this.sendMessage(count);          
       }
    }

    updateDocx(count)
    this.setState({count:count})
  }

  latestCount = async () =>{
    let count = await this.getCount();
    if (count === null) {
      setDocument(0)
      count = 0;
    }
    this.setState({count:count})
  }


  componentDidMount(){
    $('#increment').click(this.addCount)
    $('#decrement').click(this.addCount)
    $('#reset').click(this.addCount)
    this.latestCount()
    //for debug testing


  }
  render(){
    return (
      <>
        <div className="countercontent">
          <div className="center">
            <div id="value"><h1>{this.state.count}</h1></div>
            <div className="counterbtns">
              <button id="reset">reset</button>
              <button id="decrement">-</button>
              <button id="increment">+</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default FireCounter;
