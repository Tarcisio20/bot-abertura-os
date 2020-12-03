
const Robots = {
    openOS : require('./robots/robot_put'),
    finishOS : require('./robots/robot_finish'),
}

const Robot = () => {
    Robots.openOS()
   //Robots.finishOS()
}
Robot()
