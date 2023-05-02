import axios from 'axios';
import { Request, Response } from 'express'; 

export const AdminController = {
  batch: (req: Request, res: Response) => {
    axios.get(
      "https://connect.deezer.com/oauth/auth.php?app_id=599664&redirect_uri=http://localhost:4000/admin/deezerCode&perms=basic_access,email"
    )
    .then(response => console.log(response.data));
  },

  deezerCode: (req: Request, res: Response) => {
    console.log(1)
    console.log(req);
  }
};
