import React, {Component} from 'react'
import {DatabaseModel} from '../../Models'
import { 
    Container, Table, Button
} from 'reactstrap';
import AddDBRow from '../Common/AddDBRow'
import { connect } from 'react-redux'

class TableData extends Component {
    constructor(props){
        super(props)
        this.state = {
            TableData:[],
            showAddDBRow:false,
            Table:{name:"Cargando...", fields:[]}
        }
        this.handleAddRow = this.handleAddRow.bind(this)
    }

    async componentWillMount(){
        let get_porps = this.props.location.search.replace("?", "").split("&")
        let search_vars = {}
        get_porps.map(s_var => {
            let data = s_var.split("=");
            search_vars[data[0]] = data[1]
            return true
        })
        if(search_vars.name !== undefined){
            try {
                let table = this.props.DatabaseTables.filter(table => table.id == search_vars.name)[0]
                if(table !== undefined){
                    DatabaseModel.GetTableData(search_vars.name).then(table_data => {
                        if(table_data.success){
                            this.setState({TableData:table_data.data, Table: table})
                            this.forceUpdate()
                        }else{
                            console.log(table_data)
                        }
                    })
                }else{
                    DatabaseModel.GetTableInfo(search_vars.name).then(table_info => {
                        console.log(table_info)
                        if(table_info.success){
                            this.setState({Table: table_info})
                            DatabaseModel.GetTableData(search_vars.name).then(table_data => {
                                if(table_data.success){
                                    this.setState({TableData:table_data.data})
                                }else{
                                    console.log(table_data)
                                }
                            })
                        }else{
                            console.log(table_info)
                        }
                    })

                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    handleAddRow(){
        this.setState({showAddDBRow:true})
    }

    render(){
        let StateTable = this.state.Table
        return (
            <div className="TableData">
                <Container className="Father" >
                    <div className="TableDataHeader" >
                        <Button color="primary" outline onClick={() => this.props.history.goBack()} >Volver</Button>
                        
                        <h4 className="TableDataTitle">{StateTable.name}</h4>
                        <p className="countRows" >{this.state.TableData.length} registros</p>
                        
                        <Button 
                            color="secondary" 
                            outline
                            className="BtnAddRow"
                            onClick={this.handleAddRow} 
                        >
                            Agregar Registro
                        </Button>
                    </div>
                    <div className="table-responsive tableContent" >
                        <Table hover>
                            <thead>
                                <tr>
                                    {StateTable.fields.map(row => 
                                        <th>{row.Field}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.TableData.length == 0 && 
                                <tr>
                                    <td colSpan={StateTable.fields.length} >No hay registros</td>
                                </tr>
                                }
                                {this.state.TableData.map(row => 
                                    <tr>
                                        {StateTable.fields.map(field => 
                                            <td>{row[field.Field]}</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Container>
                <AddDBRow
                    show={this.state.showAddDBRow} 
                    title={"Agregar "+StateTable.name.slice(0,-1)} 
                    onAdd={newItem => this.setState({TableData:[...this.state.TableData,newItem], showAddDBRow:false })}
                    rowFields={StateTable.fields} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    DatabaseTables: state.DatabaseTables
})

export default connect(mapStateToProps, null)(TableData)