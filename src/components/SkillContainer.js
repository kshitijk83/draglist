import React, {Component} from 'react';
import SkillCard from './SkillCard';

class SkillContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            list: [
                {
                    id: 0,
                    input: false,
                    skill: "javascript"
                },
                {
                    id: 1,
                    input: false,
                    skill: "reactjs"
                },
                {
                    id: 2,
                    input: false,
                    skill: "graphql"
                },
                {
                    id: 3,
                    input: false,
                    skill: "html/css/flexbox"
                },
                {
                    id: 4,
                    input: false,
                    skill: ""
                }
            ],
            list2: [
                {
                    id: 5,
                    input: false,
                    skill: ""
                },
                {
                    id: 6,
                    input: false,
                    skill: ""
                },
                {
                    id: 7,
                    input: false,
                    skill: ""
                },
                {
                    id: 8,
                    input: false,
                    skill: ""
                },
                {
                    id: 9,
                    input: true,
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
        this.setState({list:list});
    }

    changeSkillHandler2=(value, id)=>{
        const list = this.state.list2;
        let index=list.findIndex((el)=>el.id===id);
        list[index].skill = value;
        this.setState({list2:list});
    }

    crossHandler=(id)=>{
        const list = this.state.list;
        let index=list.findIndex(el=>el.id===id);
        list[index].skill='';
        this.setState({
            list: list
        })
    }
    crossHandler2=(id)=>{
        const list = this.state.list2;
        let index=list.findIndex(el=>el.id===id);
        list[index].skill='';
        this.setState({
            list2: list
        })
    }

    render(){
        const skillCard = this.state.list.map((item, index)=>{

            return(
                <SkillCard
                key={index}
                item={item}
                y={(item.id%5)*70}
                handlePos={this.changePos}
                submitSkill={this.changeSkillHandler}
                crossHandler={this.crossHandler}
                />
            )
        });
        const skillCard2 = this.state.list2.map((item, index)=>{
            return(
                <SkillCard
                key={index}
                item={item}
                y={(item.id%5)*70}
                handlePos={this.changePos2}
                submitSkill={this.changeSkillHandler2}
                crossHandler={this.crossHandler2}
                />
            )
        });
    
        return(
            <div className="skillCon">
                <div className="left">
                    {skillCard}
                </div>
                <div className="right">
                    {skillCard2}
                </div>
            </div>
        );
    }

}

export default SkillContainer;