import ListItem from '@material-ui/core/ListItem';
import Button from '../button.jsx';

class ListObject extends Component{

    render(){
      return(
        <ListItem primaryText={this.props.primaryText} leftIcon={this.props.image} secondaryText={this.props.secondaryText} rightIconButton={<Button text='Remove'/>} />
      );
    }
  }
  
  export default ListObject;