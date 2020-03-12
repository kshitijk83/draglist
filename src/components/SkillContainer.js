import React, {Component} from 'react';
import SkillCard from './SkillCard';
import Axios from 'axios';

let intialList={
    list: [
        {
            id: 0,
            skill: ""
        },
        {
            id: 1,
            skill: ""
        },
        {
            id: 2,
            skill: ""
        },
        {
            id: 3,
            skill: ""
        },
        {
            id: 4,
            skill: ""
        }
    ],
    list2: [
        {
            id: 5,
            skill: ""
        },
        {
            id: 6,
            skill: ""
        },
        {
            id: 7,
            skill: ""
        },
        {
            id: 8,
            skill: ""
        },
        {
            id: 9,
            skill: ""
        }
    ]
}

class SkillContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: false,
            err: false,
            list: [
                {
                    id: 0,
                    skill: ""
                },
                {
                    id: 1,
                    skill: ""
                },
                {
                    id: 2,
                    skill: ""
                },
                {
                    id: 3,
                    skill: ""
                },
                {
                    id: 4,
                    skill: ""
                }
            ],
            list2: [
                {
                    id: 5,
                    skill: ""
                },
                {
                    id: 6,
                    skill: ""
                },
                {
                    id: 7,
                    skill: ""
                },
                {
                    id: 8,
                    skill: ""
                },
                {
                    id: 9,
                    skill: ""
                }
            ]
        }
    }

    changePos = (i, newPos, oldPos)=>{
        let cards = this.state.list;
        for (let j = 0; j < cards.length; j++) {
            if (j !== i) {
                if (cards[j].id ===newPos) {
                    cards[j].id = oldPos;
                    cards[i].id = newPos;
                }
            }
        }
        this.setState({
            list: cards
        })
    }

    changePos2 = (i, newPos, oldPos)=>{
        let cards = this.state.list2;
        for (let j = 0; j < cards.length; j++) {
            if (j !== i%5) {
                if (cards[j].id ===newPos) {
                    cards[j].id = oldPos;
                    cards[i%5].id = newPos;
                }
            }
        }
        this.setState({
            list2: cards
        })
    }

    changeSkillHandler=(value, id)=>{
        const list = this.state.list;
        let index=list.findIndex((el)=>el.id===id);
        list[index].skill = value;
        this.setState({list:list},()=>{
            this.saveFirebase()
        });
    }

    
    changeSkillHandler2=(value, id)=>{
        const list = this.state.list2;
        let index=list.findIndex((el)=>el.id===id);
        list[index].skill = value;
        this.setState({list2:list},()=>{
            this.saveFirebase();
        });
    }

    crossHandler=(id)=>{
        const list = this.state.list;
        let index=list.findIndex(el=>el.id===id);
        list[index].skill='';
        this.setState({
            list: list,
        },()=>{
            this.saveFirebase()
        })
    }
    crossHandler2=(id)=>{
        const list = this.state.list2;
        let index=list.findIndex(el=>el.id===id);
        list[index].skill='';
        this.setState({
            list2: list,
        },()=>{
            this.saveFirebase();
        })
    }


    saveFirebase=()=>{
        const fullList = this.state.list.concat(this.state.list2);
        let self = this;
        this.setState({
            loading: true,
            err:false
        },()=>{
            Axios.delete("https://devorizon.firebaseio.com/skills/-M2CMLhL_MF-AL0TE2lm.json")
            .then((res)=>{
                return Axios.put("https://devorizon.firebaseio.com/skills/-M2CMLhL_MF-AL0TE2lm.json", fullList)
            })
            .then(res=>{
                self.setState({loading: false, err: false})
            })
            .catch(err=>{
                self.setState({loading: false, err: true});
            });
        })
    }

    componentDidMount(){
        Axios.get("https://devorizon.firebaseio.com/skills/-M2CMLhL_MF-AL0TE2lm.json")
        .then(res=>{
            if(!res.data){
                this.setState({
                    ...intialList
                })
            } else{
                const list = res.data.slice(0, 5);
                const list2 = res.data.slice(5, 10);
                this.setState({list, list2});
            }
        })
    }

    render(){
        const skillCard = this.state.list.map((item, index)=>{

            return(
                <SkillCard
                key={index}
                item={item}
                y={(item.id%5)*70}
                z={5-(item.id%5)}
                handlePos={this.changePos}
                submitSkill={this.changeSkillHandler}
                crossHandler={this.crossHandler}
                save={this.saveFirebase}
                />
            )
        });
        const skillCard2 = this.state.list2.map((item, index)=>{
            return(
                <SkillCard
                key={index}
                item={item}
                y={(item.id%5)*70}
                z={5-(item.id%5)}
                handlePos={this.changePos2}
                submitSkill={this.changeSkillHandler2}
                crossHandler={this.crossHandler2}
                save={this.saveFirebase}
                />
            )
        });
    
        return(
            <>
            <span style={{position: "absolute", top: 0, left: "50%"}}>{this.state.loading?"saving": ""}</span>
            <span>{this.state.err?"some error": ""}</span>
            <div className="skillCon">
                <div className="left">
                    {skillCard}
                </div>
                <div className="right">
                    {skillCard2}
                </div>
            </div>
            </>
        );
    }

}

export default SkillContainer;