import React,{ Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    // ✅ Correct place to define state
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: "https://dummyimage.com/100x100/ccc/000&text=User",
      },
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/Ajett");
      const json = await data.json();

      this.setState({
        userInfo: json,
      });

      console.log("Fetched user:", json);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  render() {
    const { name, location, avatar_url, html_url } = this.state.userInfo;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-orange-500 mb-3">About Us</h1>
          <p className="text-gray-600 text-lg mb-8">
            Welcome to <span className="font-semibold text-orange-500">Eatzo</span> — 
            your one-stop destination for delicious meals delivered straight to your door.
            Our goal is to make food ordering simple, fast, and satisfying!
          </p>

          {/* ✅ Dynamic Developer Info */}
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl shadow p-6 flex flex-col items-center space-y-3">
            <img
              src={avatar_url}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-orange-400 shadow-md"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{location}</p>
            {html_url && (
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                View GitHub Profile
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
