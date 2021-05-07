import HomeController from "../controller/homeController";
import ReportUseCase from "../domain/usecase/report";

const report = new ReportUseCase()

const homeController = (context) => new HomeController(context, report)
export { homeController }