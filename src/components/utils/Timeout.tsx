import React, { useState, useEffect, PropsWithChildren } from 'react';
import { History } from 'history';
import { Redirect } from 'react-router-dom';


const events: string[] = [
  "mousedown",
  "mouseover",
  "mouseenter",
  "mouseout",
  "mouseup",
  "click",
  "change",
  "keypress",
  "keydown",
  "keyup"
];

const MAX_IDLE_TIME = 600;

interface Props {
  history: History
}

interface State {
  seconds: number
}


function Timeout(props: PropsWithChildren<Props>) {


  const [seconds, setSeconds] = useState(0);


  const setSecondTo0 = () => {
    setSeconds(0)
  };

  const setIncrementSeconds = () => {
    setSeconds(seconds + 1);
  }

  function addOrRemoveEvents(type: 'add' | 'remove') {
    if (type === 'add') {
      events.forEach(event => document.addEventListener(event, setSecondTo0));
    } else {
      events.forEach(event => document.removeEventListener(event, setSecondTo0));
    }
  }


  useEffect(() => {
    addOrRemoveEvents('add');
    const interval = setInterval(() => {
      setIncrementSeconds();
    }, 1000);
    return () => {
      addOrRemoveEvents('remove');
      clearInterval(interval);
    }
  }, [seconds])


  return (
    seconds > MAX_IDLE_TIME ?
      <Redirect to="/" />
      : props.children
  )



  // return class extends Component<Props, State> {
  //   state = {
  //     seconds: 0
  //   }

  //   interval: any = 0;
  //   tick = () => {
  //     this.interval = setInterval(() => {
  //       this.setState(state => ({ ...state, seconds: state.seconds + 1 }))
  //     }, 1000);
  //   }

  //   componentDidMount() {
  //     events.forEach((event, i) => {
  //       document.addEventListener(event, this.eventCallback)
  //     });
  //     this.tick();
  //   }

  //   eventCallback = (e: Event) => {
  //     this.setState({
  //       seconds: 0
  //     })
  //   }

  //   componentWillUnmount() {
  //     events.forEach((event, i) => {
  //       document.removeEventListener(event, this.eventCallback)
  //     })
  //     clearInterval(this.interval);
  //   }


  //   logout = () => {
  //     localStorage.removeItem('token');
  //     this.props.history.push('/');
  //   }


  //   render() {
  //     if (this.state.seconds >= MAX_IDLE_TIME) {
  //       return <Redirect to="/" />
  //     }
  //     return (
  //       <Comp {...this.props} />
  //     )
  //   }
  // }
}



export default Timeout;