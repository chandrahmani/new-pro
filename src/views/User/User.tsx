import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState<string>('');
  const [editName, setEditName] = useState<Record<number, string>>({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1', {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });
      console.log('Response:', response);

      const userData = response.data.data;
      setUsers(userData);
      setError(null);

      // Editing Name
      const nameMap: Record<number, string> = {};
      userData.forEach((user: UserType) => {
        nameMap[user.id] = `${user.first_name} ${user.last_name}`;
      });
      setEditName(nameMap);
    } catch (err: unknown) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchUser.toLowerCase()),
  );

  const handleUpdateUser = (id: number) => {
    const fullName = editName[id]?.trim() || '';
    if (!fullName) return;

    const [first_name = '', ...rest] = fullName.split(' ');
    const last_name = rest.join(' ');

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, first_name, last_name } : user)),
    );
    setEditName((prev) => ({ ...prev, [id]: '' }));
    setSearchUser('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Hospitsal Management
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        Welcome to our user management system! Here you can find a list of users and learn more
        about our team.
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        sx={{ mb: 3 }}
      />

      {error && (
        <Alert
          severity="error"
          variant="standard"
          sx={{ mb: 2, backgroundColor: '	#99cc33', color: 'white' }}
        >
          {error}
        </Alert>
      )}

      {!filteredUsers.length && !error && (
        <Alert severity="info" variant="standard" sx={{ mb: 2 }}>
          No users found.
        </Alert>
      )}
      {filteredUsers.map((user: UserType) => (
        <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={user.first_name} src={user.avatar} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Grid>
          </Grid>
          <TextField
            label="Edit Name"
            variant="outlined"
            size="small"
            value={editName[user.id] || ''}
            onChange={(e) => setEditName((prev) => ({ ...prev, [user.id]: e.target.value }))}
            sx={{ mt: 2, mr: 2 }}
          />
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => handleUpdateUser(user.id)}
          >
            Update Name
          </Button>
        </Paper>
      ))}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                alt="John Doe"
                src="https://via.placeholder.com/150"
                sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
              />
              <Typography variant="h6" component="h3">
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CEO & Founder
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                alt="Jane Smith"
                src="https://via.placeholder.com/150"
                sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
              />
              <Typography variant="h6" component="h3">
                Jane Smith
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lead Developer
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                alt="Alice Johnson"
                src="https://via.placeholder.com/150"
                sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
              />
              <Typography variant="h6" component="h3">
                Alice Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                UX Designer
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default User;
