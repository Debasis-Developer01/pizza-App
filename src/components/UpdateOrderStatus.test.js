import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import UpdateOrderStatus from "./UpdateOrderStatus"

test("test updateOrder",()=>
{
    render(<BrowserRouter><UpdateOrderStatus/></BrowserRouter>)
    const btnElement = screen.getByText("Submit");
    expect(btnElement).toBeInTheDocument();
})