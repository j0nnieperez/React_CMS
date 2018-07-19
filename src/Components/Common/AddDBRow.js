import React from 'react';
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Input
} from 'reactstrap';
import * as Models from '../../Models';

class AddDBRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Title:'',
        ErrorMessage:'',
        modal:false,
        RowData:[],
        RowDataFill:{}
    };
    this.toggle = this.toggle.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.rowFields)
    var RowDataFill = {}
    if(nextProps.rowFields != undefined){
       nextProps.rowFields.map(row => {
            RowDataFill[row.Field] = ""
       })
    }
    this.setState({
        modal:nextProps.show,
        Title:nextProps.title,
        RowData: nextProps.rowFields,
        RowDataFill
    })
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  async handleAdd(){
    try {
        console.log(this.state.RowDataFill)
        var AddUserRequest = await Models.UserModel.AddUser(this.state.RowDataFill)
        if(AddUserRequest.success){
            this.setState({modal:false})
            this.props.onAdd(this.state.RowDataFill)
        }else{
            this.setState({ErrorMessage:AddUserRequest.message})
            console.log(AddUserRequest)
        }
    } catch (error) {
        console.log(error)        
    }
  }

  render() {
    return (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.Title}</ModalHeader>
          <ModalBody>
              <p style={{color:"red"}} >{this.state.ErrorMessage}</p>
                {this.state.RowData.map(Row => {
                    if(
                        Row.Field == "id" || Row.Field == "created_at" || 
                        Row.Field == "updated_at" || Row.Field=="is_super_user" ||
                        Row.Field == "is_active" || Row.Field == "remember_token" ||
                        Row.Field == "last_login"
                    ) return 
                    if(Row.Type.indexOf("char") != -1){
                        return (
                            <Input 
                            name={Row.Field} 
                            id={Row.Field} 
                            placeholder={Row.Field} 
                            value={this.state.RowDataFill[Row.Field]} 
                            onChange={text => this.setState({RowDataFill: {...this.state.RowDataFill,[Row.Field]:text.target.value } })}  
                            required
                            />
                        )}
                    else if(Row.Type.indexOf("varchar") != -1){
                        return (
                            <Input 
                            name={Row.Field} 
                            id={Row.Field} 
                            placeholder={Row.Field} 
                            value={this.state.RowDataFill[Row.Field]} 
                            onChange={text => this.setState({RowDataFill: {...this.state.RowDataFill,[Row.Field]:text.target.value } })}  
                            required
                            />
                        )}
                    else if(Row.Type.indexOf("datetime") != -1){
                        return (<div>Falta</div>)}
                    else if(Row.Type.indexOf("tinyint") != -1){
                        return (<div>Falta</div>)}
                    else if(Row.Type.indexOf("timestamp") != -1){
                        return (<div>Falta</div>)}
                })}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAdd}>Crear</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default AddDBRow;