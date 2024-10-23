import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>HOME</h1>
      <div className="second-container">
        <div className="profile"></div>
        <div style={{textAlign: "left"}}>
          name: Kannapich Baosri
          <br />
          age: 19
          <br />
          my birthday: 01/04/2005
          <br />
          currently study at SPU
          <br />
          my hobby: play some game and read novel
          <br />
          i like to learn about coding something that make my life easier at least a little bit
          <br />
          i'm bad at talking with people that not friend or someone older
        </div>
      </div>
    </div>
  );
}

export default Home;
