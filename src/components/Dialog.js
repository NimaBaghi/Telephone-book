import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import parsePhoneNumber from 'libphonenumber-js'



const Dialog = () => {
  	const [open, setOpen] = React.useState(false);
  	const [selectedValue, setSelectedValue] = React.useState("");
	const [list,setList] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then(response => {
				setList(response);
			})
	}, [])

  	const handleOpen = () => {
    	setOpen(true);
  	};

	const handleClose = () => {
		setOpen(false);
	}

  	const handleListItemClick = (value) => {
		handleClose();
		setSelectedValue((value));
  	};

  	return (
    	<div>
    		<Typography variant="subtitle1" component="div">
				{selectedValue === ""? "No number selected yet!" : "Selected: " + selectedValue}
    		</Typography>
			<br />
      		<Button variant="outlined" onClick={handleOpen}>
        		Open Contact List
      		</Button>
			<MuiDialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
				<DialogTitle> Phone Number </DialogTitle>
				<List>
					{list.map((item) => {
						let number = item.phone;
						const phoneNumber = parsePhoneNumber(number,'US')
						const formattedPhoneNumber = phoneNumber.formatInternational()
						return( 
							<ListItem 
								button 
								secondaryAction={selectedValue === formattedPhoneNumber ? <CheckCircleIcon color="primary" />: null} 
								onClick={() => handleListItemClick(formattedPhoneNumber)} 
								key={item.id}
							>
								<ListItemText primary={item.name} secondary={formattedPhoneNumber}/>
							</ListItem>
						)
					})}
				</List>
			</MuiDialog>
    	</div>
  	);
}

export default Dialog
