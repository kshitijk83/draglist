import React, {Component} from 'react';
// import request from '../instance';
import Axios from 'axios';

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
          z: 0,
          x:0,
          y: 0,
          posy: 0,
          posx: 0,
          isInput: false,
          inputValue: '',
          customSkill: false,
          options:[
            {name: "Type..."},
          ]
        };
        this.hold=false;
        this.timer=null;
        this.down=false;
        this.selectOption=false;
      }
      componentWillMount() {
        this.setState({
          item: this.props.item,
          val: (this.props.item.id%5),
          y: this.props.y,
          no: this.props.item.id,
          inputValue: this.props.item.skill,
          z: this.props.z
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
        
        if(e.target.tagName==='LI'){
          e.target.click();
        }
        if(!this.state.isInput){
          this.setState({
            down: true,
            z: 40,
            posy: e.clientY,
            posx: e.clientX
          });
        }
      }
    
      handleUp=(e)=> {
        
        e.stopPropagation()
        if(this.state.down&&this.hold){
          this.setState({
              down: false,
              z:this.props.z
          },()=>{
            this.props.save()
          });
        }
      }
    
      handleMove=(e)=> {
        let self = this;
        if (this.state.down&&!this.state.isInput) {
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
        if (!this.state.down&&!this.state.isInput) {
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
      if(e.target.tagName==="SPAN"){
        this.crossHandler();
      } else{
        clearTimeout(this.timer);
        if(!this.hold){
          this.setState({isInput: true});
        }
        this.hold=false;
      }
    }
    
    onChangeHandler=(e)=>{
      let value=e.target.value;
      this.setState({inputValue: value},()=>{
        Axios.get(`https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&inname=${value}&site=stackoverflow&key=4cNUxilQMBTsBooH1WZqyQ((`)
        .then(res=>{
          if(!res.data.items[0]){
            this.setState({
              options: [{name: `Create Option ${value}`}],
              customSkill: true
            })
          } else{
            this.setState({
              options: res.data.items,
              customSkill: false
            })
          }
        })
        .catch(err=>{
          console.log(err);
        })

      })
    }
    onSubmitSkillHandler=(value, id, e)=>{
      if(e.nativeEvent.type==="keydown"||"click"){

        this.setState({isInput: false, down: false},()=>{
          if(this.state.inputValue){
            if(this.state.customSkill){
              var x = value.replace("Create Option ", '');
              this.props.submitSkill(x, id);
            } else{
              this.props.submitSkill(value, id);
            }
          }
        });
      } else if(e.nativeEvent.type==="blur"){
        this.setState({isInput: false, down: false},()=>{
          if(this.state.inputValue){
            if(this.state.customSkill){
              var x = value.replace("Create Option ", '');
              this.props.submitSkill(x, id);
            } else{
              this.props.submitSkill(value, id);
            }
          }
        });
      }
    }
    enterHandler=(e)=>{
      if(e.key==="Enter"&&e.target.value){
        this.onSubmitSkillHandler(e.target.value, this.state.item.id, e);
      }
    }

    selectOptionHandler=(val,id, e)=>{
      this.onSubmitSkillHandler(val, id, e);
    }

    crossHandler=()=>{
      this.setState({
        options: [{name: "Type..."}],
        inputValue: '',
        down: false
      },()=>{
        this.props.crossHandler(this.state.item.id);
      });
    }

    render(){
      const self = this;
      const isInput = this.state.isInput||!this.state.inputValue?(
        <>
          <input
          onKeyDown={(e)=>this.enterHandler(e)}
          onChange={(e)=>this.onChangeHandler(e)}
          value={this.state.inputValue}
          onBlur={(e)=>this.onSubmitSkillHandler(e.target.value, this.state.item.id, e)}
          autoFocus
          className="skillInput"
          placeholder={this.state.item.id+".Add Skill"}
          />
          <ul className="dropdown" style={{opacity: this.state.isInput?"1":"0", visibility: this.state.isInput?"visible":"hidden"}}>
            {this.state.options.map((el,i)=><li onClick={(e)=>self.selectOptionHandler(el.name, this.state.item.id,e)} key={i}>{el.name}</li>)}
          </ul>
        </>
         ):(
          <div className="skill">
            <span>{this.props.item.skill}</span>
            <span className="cross" onClick={()=>this.crossHandler}>&#10006;</span>        
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