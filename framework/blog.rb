module Blog
  class User
  end
  #Will be used to get information about posts
  class Post
    def user()
      return #get User and return a string
    end
    def tags()
      return #get tags from database and return them in an array
    end
  end
  class UserController

  end
  #Will be used to make creating posts more dynamic
  class PostController
    def addHeadingField(type)
      if type == "h2" || type == "h3" || type == "h4"
        return "input class='#{type}' type='text' placeholder='Heading'"
      end
    end
    def addQuoteField()
      return "input class='quote' type='text' placeholder='This is your quote'"
    end
    def addTextField()
      return "input class='text' type='text' placeholder='Write Stuff here...'"
    end
    def addImageField()
      return "input class='post-img' type='file' name='filename'"
    end
    def update()
    end
    def create()
    end
  end
  class ProjectController
  end
end