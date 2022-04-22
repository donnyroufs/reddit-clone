import { Widget } from "../../Components/Widget/Widget"
import { CreateSubredditWidgetContent } from "./CreateSubredditWidgetContent"
import { CreateSubredditWidgetHeader } from "./CreateSubredditWidgetHeader"

export const CreateSubredditWidget = () => (
  <Widget
    header={<CreateSubredditWidgetHeader />}
    content={<CreateSubredditWidgetContent />}
  />
)
