import React from "react";
import UserContext from "../utils/UserContext";
class UserClass extends React.Component{

  constructor(props) {
    super(props);

    //console.log(this.props.name+"Child constructor")

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url:"htt//dummy.com",
      }
    //   count: 0,
    //   count2:2,
     }

  }

   async componentDidMount() {

    // console.log(this.props.name +"Child componentdid Mount")
     const data = await fetch("https://api.github.com/users/Ajett");
     const json = await data.json();
     this.setState({
       userInfo: json,
     });
    
     console.log(json);
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Componenet will Unmount");
  }

  render() {

    // console.log("Child Render")
     const { name, location, avatar_url } = this.state.userInfo;
    // const { count,count2 } = this.state;
    return (
      <div className="user-card">
        {/* <h1>Count={count}</h1>
        <h1>Count2:{count2}</h1> */}
        {/* <button onClick={() => {
          this.setState({
            count: this.state.count + 1,
           })
        }}>Count Increase</button> */}
        <div>
          User:
          <UserContext.Consumer>
            {
              ({ loggedInUser }) => <h1>{loggedInUser}</h1>
              
            } 
          </UserContext.Consumer>
        </div>  
        <h2>Name:{name}</h2>
        
        <img src={avatar_url}></img>
        <h3>Location:{ location}</h3>
    </div>
    )
  }
}

export default UserClass;