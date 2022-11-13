import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { decrement } from "./counterSlice";

const Contact = () => {
  const dispatch = useAppDispatch();
  const{data,title}=useAppSelector(state=>state.counter)
  return (
    <>
    <Typography variant="h1">
       {title}
       {data}
    </Typography>
    <ButtonGroup>
      <Button onClick={()=>dispatch(decrement(2))}>test me text </Button>
    </ButtonGroup>
    </>
  )
}

export default Contact