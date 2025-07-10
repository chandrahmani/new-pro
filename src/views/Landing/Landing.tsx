import { FC, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import StandardImageList from '../../components/StandardImageList/StandardImageList';

interface User {
  id: string;
  name: string;
  job: string;
}

const Landing: FC = () => {
  const [formData, setFormData] = useState({ name: '', job: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://reqres.in/api/users', formData, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });

      const newUser: User = {
        id: response.data.id,
        name: response.data.name,
        job: response.data.job,
      };

      console.log('Response:', response.data);
      setUsers((prev) => [newUser, ...prev]);
      setSuccess(`User created with ID: ${response.data.id}`);
      setFormData({ name: '', job: '' });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to create user.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <Box p={3} gap={3}>
      <Typography variant="h3">Hello My New Post</Typography>
      <Typography variant="body1" color="textSecondary">
        This is a simple landing page to showcase the new post feature.
      </Typography>

      <Box
        maxWidth={400}
        mx="auto"
        mt={5}
        p={3}
        borderRadius={2}
        boxShadow={3}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" mb={2}>
          Create New User
        </Typography>

        <TextField
          fullWidth
          label="name"
          name="name"
          margin="normal"
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="job"
          name="job"
          margin="normal"
          onChange={handleChange}
          required
        />

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </Box>
      </Box>

      {/* User List */}
      {users.length > 0 && (
        <Box mt={5}>
          <Typography variant="h6" mb={1}>
            User List
          </Typography>
          <List>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                      delete
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${user.name}`}
                    secondary={`Job: ${user.job} | ID: ${user.id}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      <Box display="flex" alignItems="center" justifyContent="center">
        <StandardImageList />
      </Box>
    </Box>
  );
};

export default Landing;
