import { useRoutes } from "react-router-dom";
import { routes } from "../routes";
function Allroutes() {
    const elements = useRoutes(routes);
    return <>
        {elements }
    </>
}
export default Allroutes;