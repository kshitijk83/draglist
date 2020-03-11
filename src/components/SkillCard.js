import React, {Component} from 'react'

class SkillCard extends Component {
   constructor(props) {
        super(props);
        this.state = {
          item: null,
          no: this.props.item.id,
          val: null,
          down: false,
          v: 0,
          vx: 0,
          z: 1,
          x:0,
          y: 0,
          posy: 0,
          posx: 0,
          isInput: false,
          inputValue: this.props.item.skill
        };
        this.hold=false;
        this.timer=null;
        this.down=false;
      }
      componentWillMount() {
        this.setState({
          item: this.props.item,
          val: (this.props.item.id%5),
          y: this.props.y,
          no: this.props.item.id,
          inputValue: this.props.item.skill
        });
      }
    
      componentDidMount() {
        this.startLoop();
      }
    
      componentWillReceiveProps(newProps) {
        if (!this.state.down) {
        this.setState({
            item: newProps.item,
            val: (newProps.item.id%5),
            inputValue: newProps.item.skill
            });
        }
      }
    
      handleDown=(e)=> {
        // this.down=true;
        this.setState({
          down: true,
          z: 4,
          posy: e.clientY,
          posx: e.clientX
        });
      }
    
      handleUp=()=> {
        // clearTimeout(this.timer);
        this.setState({
            down: false,
            z:1
          });
      }
    
      handleMove=(e)=> {
        let self = this;
        if (this.state.down) {
          this.timer=setTimeout(() => {
            self.hold=true;
          }, 150);
          let newPos = e.clientY - this.state.posy;
          let newPosX = e.clientX - this.state.posx;
          this.setState(
            {
              y: this.state.val * 70 + newPos,
              x: newPosX
            },
            () => {
                
                if (this.state.y > (this.state.item.id%5) * 70 + 35) {
                if ((this.state.item.id%5) + 1 < 5) {
                    var x={...this.state.item};
                  this.setState(
                    {
                      item: {...x,id:x.id + 1}
                    },
                    () => {
                      this.props.handlePos(
                        this.state.no,
                        this.state.item.id,
                        this.state.item.id - 1
                      );
                    }
                  );
                }
              } else if (this.state.y < (this.state.item.id%5) * 70 - 35) {

                if ((this.state.item.id%5) - 1 > -1) {
                    var y={...this.state.item};
                  this.setState(
                    {
                      item: {...y, id: y.id - 1}
                    },
                    () => {
                      this.props.handlePos(
                        this.state.no,
                        this.state.item.id,
                        this.state.item.id + 1
                      );
                    }
                  );
                }
              }
            }
          );
        }
      }
      updateYaxis=()=> {
        if (!this.state.down) {
          let f = -0.2 * (this.state.y - (this.state.item.id%5) * 70);
          let x = -.2*this.state.x;
          let ax = x/1;
          let a = f / 1;
          this.setState(
            {
              v: 0.3 * (this.state.v + a),
              vx: 0.3 * (this.state.vx + ax)
            },
            () => {
              this.setState({
                y: this.state.y + this.state.v,
                x: this.state.x + this.state.vx
              });
            }
          );
        }
      }

    startLoop=()=> {
      if (!this._frameId) {
        this._frameId = window.requestAnimationFrame(this.animate);
      }
    }
  
    animate=()=> {
      this.updateYaxis();
      document.getElementById("card" + this.state.no).style.transform =
        " translate3d("+this.state.x+"px ," +
        this.state.y +
        "px, 0px)";
      document.getElementById("card" + this.state.no).style.zIndex = this.state.z;
      this.frameId = window.requestAnimationFrame(this.animate);
    }

    clickHandler = (e)=>{
      clearTimeout(this.timer);
      if(!this.hold){
        this.setState({isInput: true});
      }
      this.hold=false;
    }
    
    onChangeHandler=(e)=>{
      this.setState({inputValue: e.target.value});
    }
    onSubmitSkillHandler=(value, id)=>{
      this.setState({isInput: false});
      this.props.submitSkill(value, id);
    }
    enterHandler=(e)=>{
      if(e.key==="Enter"&&e.target.value){
        this.onSubmitSkillHandler(e.target.value, this.state.item.id);
      }
    }

    render(){
      const isInput = this.state.isInput||!this.state.inputValue?(
        <input
        onKeyDown={(e)=>this.enterHandler(e)}
        onChange={(e)=>this.onChangeHandler(e)}
        value={this.state.inputValue}
        onBlur={(e)=>this.onSubmitSkillHandler(e.target.value, this.state.item.id)}
        autoFocus className="skillInput"
        placeholder={this.state.item.id+".Add Skill"}
        />
         ):(
          <div className="skill">
            <span>{this.props.item.skill}</span>
            <span className="cross" onClick={()=>this.props.crossHandler(this.state.item.id)}>&#10006;</span>        
        </div>
        );
        return(
            <>
                <div
                onClick={this.clickHandler}
                className="list"
                id={`card${this.state.no}`}
                onMouseDown={this.handleDown}
                onMouseMove={this.handleMove}
                onMouseUp={this.handleUp}
                onMouseLeave={this.handleUp}
                >
                  {isInput}
                </div>
            </>
        );
    }
}

export default SkillCard;