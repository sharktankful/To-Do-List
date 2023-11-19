import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect } from 'react';
import jwt from "jsonwebtoken";

interface Props {
    JWTToken: string;
}



const TaskList: React.FC<Props> = ({JWTToken}) => {


    useEffect(() => {
        const requestData: AxiosRequestConfig = {
            headers: {
                Authorization: JWTToken,
            }
        }

        axios.get("http://todolistapi-dev.us-west-2.elasticbeanstalk.com/create/", requestData).then((res) => console.log(res.data));

    }, [JWTToken]);



  return (
    <div>TaskList</div>
  )
}

export default TaskList