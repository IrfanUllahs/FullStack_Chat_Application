import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Avatar,
  Center,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setUser } from "../redux/features/authSlice";
const baseURL = import.meta.env.VITE_API_URL;
function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const [name, setName] = useState(user?.userData?.name || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.userData?.image || "");

  useEffect(() => {
    setName(user?.userData?.name || "");
    setPreview(user?.userData?.image || "");
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (name !== user?.userData?.name || image) {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("file", image);
      }

      try {
        let result = await axios.patch(
          `${baseURL}/api/user/update/${user?.userData?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        let storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.userData = {
          ...storedUser.userData,
          ...result.data.userData,
        };
        localStorage.setItem("user", JSON.stringify(storedUser));
        dispatch(setUser(storedUser));
        toast({
          title: "Profile updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error in updating",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error.response.data.message);
      }
    } else {
      toast({
        title: "Name and image are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAccount = () => {
    // dispatch(deleteUser(user.userData._id));
    toast({
      title: "Account deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Center py={6} px={5} className="bg-[#6E00FF] min-h-screen rounded-lg ">
      <Box
        maxW="md"
        w="full"
        bg="white"
        boxShadow="md"
        rounded="lg"
        p={{ base: 3, md: 6 }}
        textAlign="center"
        className="-green-700 md:mb-0 mb-[150px]"
      >
        <Avatar
          size="xl"
          src={
            `http://localhost:5000/uploads/${user?.userData?.image}` || preview
          }
          mb={4}
        />
        <FormControl id="image" mb={4}>
          <FormLabel>Profile Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            border="0px"
            borderBottom="1px"
            rounded="0"
            fontSize="10px"
          />
        </FormControl>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Stack direction="row" spacing={4} align="center" justify="center">
          <Button colorScheme="teal" onClick={handleUpdate} fontSize="11px">
            Update Profile
          </Button>
          <Button
            colorScheme="red"
            onClick={handleDeleteAccount}
            fontSize="11px"
          >
            Delete Account
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default Profile;
