import React, {Component} from 'react'
// let frameId;
class SkillCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          item: null,
          no: null,
          val: null,
          down: false,
          v: 0,
          z: 1,
          y: 0,
          posy: 0,
          newPos: 0,
        };    
    this.animate = this.animate.bind(this);
    this.startLoop = this.startLoop.bind(this);
    this.updateYaxis = this.updateYaxis.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleMove = this.handleMove.bind(this);
    }
    componentWillMount() {
        this.setState({
          item: this.props.item,
          val: this.props.item.id,
          y: this.props.item.id * 100,
          no: this.props.item.id
        });
    }
    
    componentDidMount() {
    this.startLoop();
    }
    
    componentWillReceiveProps(newProps) {
        if (!this.state.down) {
            debugger;
        this.setState({
            item: newProps.item,
            val: newProps.id,
            no: newProps.item.id
        });
    }
    }
    
    handleDown(e) {
    this.setState({
        down: true,
        z: 4,
        posy: e.clientY
    });
    }
    
    handleUp() {
    this.setState({
        down: false
    });
    }

    handleMove(e) {
    if (this.state.down) {
        let newPos = e.clientY - this.state.posy;
        this.setState(
        {
            y: this.state.no * 100 + newPos
        },
        () => {
            if (this.state.y > this.state.item.id * 100 + 50) {
                if (this.state.item.id + 1 < 5) {
                    // debugger;
                this.setState(
                {
                    item: {...this.state.item, id: this.state.item.id+1}
                },
                () => {
                    this.props.handlePos(
                    this.state.no,
                    this.state.item.id,
                    this.state.item.id-1
                    );
                }
                );
            }
            } else if (this.state.y < this.state.item.id * 100 - 50) {
                // debugger;
            if (this.state.item.id - 1 > -1) {
                this.setState(
                {
                    item: {...this.state.item, id: this.state.item.id-1}
                },
                () => {
                    this.props.handlePos(
                    this.state.no,
                    this.state.item.id,
                    this.state.item.id+1
                    );
                }
                );
            }
            }
        }
        );
    }
    }

    updateYaxis() {
    if (!this.state.down) {
        let f = -0.2 * (this.state.y - this.state.item.id * 100);
        let a = f / 1;
        this.setState(
        {
            v: 0.3 * (this.state.v + a)
        },
        () => {
            this.setState({
            y: this.state.y + this.state.v
            });
        }
        );
    }
    }

    startLoop() {
    if (!this._frameId) {
        this._frameId = window.requestAnimationFrame(this.animate);
    }
    }
    
    animate() {
    this.updateYaxis();
    document.getElementById("card" + this.state.item.id).style.transform =
        " translate3d(0px ," +
        this.state.y +
        "px, 0px)";
    document.getElementById("card" + this.state.item.id).style.zIndex = this.state.z;
    this.frameId = window.requestAnimationFrame(this.animate);
    }
      stopLoop() {
        window.cancelAnimationFrame(this._frameId);
      }
    // listItem =(
    //     <div
    //     // onClick={clickHandler}
    //     className="list"
    //     // id={`card${props.id}`}
    //     // onMouseDown={handleDown}
    //     // onMouseMove={handleMove}
    //     // onMouseUp={handleUp}
    //     // onMouseLeave={handleUp}
    //     >
    //     {/* {!isInput?( */}
    //     {/* <div className="skill">
    //         <span>{this.props.item.skill}</span>
    //         <span className="cross">&#10006;</span>        
    //     </div> */}
    //     {/* ):(
    //         <input ref={selectedInput} onBlur={()=>setIsInput(false)} autoFocus className="skillInput" placeholder={props.id+".Add Skill"} />
    //     )} */}
    //     </div>
    // );

    render(){
        return(
            <>
                <div
                // onClick={clickHandler}
                className="list"
                id={`card${this.props.id}`}
                onMouseDown={this.handleDown}
                onMouseMove={this.handleMove}
                onMouseUp={this.handleUp}
                onMouseLeave={this.handleUp}
                >
                <div className="skill">
                    <span>{this.props.item.skill}</span>
                    <span className="cross">&#10006;</span>        
                </div>
                </div>
            </>
        );
    }
}

export default SkillCard;