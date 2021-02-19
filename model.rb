def connect_to_db()
  db = SQLite3::Database.new('db/blog.db')
  db.results_as_hash = true
  return db
end

# user class
class User
  attr_reader :userId, :username
  def initialize(username, userId)
    @username = username
    @userId = userId
  end

  def projects()
    db = connect_to_db()
    return db.execute("SELECT * FROM projects WHERE userId=?", @userId)
  end

  def posts(projectId)
    db = connect_to_db()
    return db.execute("SELECT * FROM posts WHERE projectId=?", projectId)
  end

  def post(projectId, postTitle)
    posts(projectId).each do |post|
      if post["postTitle"] = postTitle
        return post
      end
    end
  end
end

# Work in progress
class Project
  attr_reader :projectTitle
  def initialize()
  end
  
  def projectId()
    db = connect_to_db()
    db.execute("SELECT projectId FROM projects")
  end
end

# Work in progress
class Post
  attr_accessor :projectId, :title, :desc, :content, :date, :isPublic, :tags
  def initialize(projectId, title, desc, content, date, isPublic, tags)
    @projectId = projectId
    @title = title
    @desc = desc
    @content = content
    @date = date
    @isPublic = isPublic
    @tags = tags
  end
end

# user crud
def register_user(username, password, confirm_password)
  # #check if anything is wrong with username or passwords such that 
  # if username.length < 4
  #   session[:errormsg] = "Username must be more than 3 characters."
  #   redirect('/signup')
  # elsif password.length < 8
  #   session[:errormsg] = "Password must be at least 8 characters long."
  #   redirect('/signup')
  # elsif username == "" && password == ""
  #   session[:errormsg] = "Username and password cannot be blank"
  #   redirect('/signup')
  # end

  if password == confirm_password #Check if passwords match
    db = connect_to_db()
    # encrypt password
    password_digest = BCrypt::Password.create(password)
    
    db.execute('INSERT INTO users (username, pwdigest) VALUES (?,?)', username, password_digest)
    
    #Redirect to main
  else #Passwords do not match
    session[:errormsg] = "Passwords do not match!"
    redirect('/signup')
  end
end
def get_user()
end
def login_user(username, password)
  db.connect_to_db()

  #check if username exists in database
  check = db.execute("SELECT EXISTS(SELECT * FROM users WHERE username=?)", username).first.first
  if check == 1
    result = db.execute("SELECT * FROM users WHERE username = ?", username).first
    db_pwdigest = result["pwdigest"]
    id = result["id"]
    if BCrypt::Password.new(db_pwdigest) == password #Check if password is right
      session[:user] = User.new(username, id)
      redirect('/home')
    else #Password was wrong
      session[:errormsg] = "User does not exist or the password was wrong, please try again."
      redirect('/login')
    end
  else #User does not exist
    session[:errormsg] = "User does not exist or the password was wrong, please try again."
    redirect('/login')
  end
end
def delete_user()
end

# project crud
def new_project()
end
def delete_project()
end
def update_project()
end
def get_project(userId, projectTitle)
end
def check_project(userId, projectId)
  db = connect_to_db
  project = db.execute("SELECT * FROM projects WHERE userId=? AND projectId=?", userId, projectId).first
  return project != nil ? true : false
end

def attach_tags_to_project()
end
def detach_tags_from_project()
end

# post crud
def get_post(value, type)
  db = connect_to_db()
  if type == "title"
    post = db.execute("SELECT * FROM posts WHERE postTitle=?", value).first
    return post
  elsif type == "id"
    post = db.execute("SELECT * FROM posts WHERE postId=?", value).first
    return post
  end
end
def new_post(userId, post)
  db = connect_to_db()
  db.execute("INSERT INTO posts (postTitle, postDesc, postDate, postContent, postIsPublic, projectId) VALUES (?,?,?,?,?,?)", post.title, post.desc, post.date, post.content, post.isPublic, post.projectId)
  newPost = db.execute("SELECT * FROM posts WHERE postTitle=?", post.title).first
  attach_tags_to_post(newPost, post.tags)
end
def delete_post()
end
def update_post()
end

def check_post(postTitle, projectId)
  db = connect_to_db
  post = db.execute("SELECT * FROM posts WHERE postTitle=? AND projectId=?", postTitle, projectId).first
  return post != nil ? true : false
end

def attach_tags_to_post(post, tags)
  db = connect_to_db
  tags = tags.split(",")
  tags.each do |tag|
    db.execute("INSERT INTO post_tag_rel (postId, tagId) VALUES (?,?)", post["postId"], tag)
  end
end
def detach_tags_from_post()

end

# upload img to img folder
def img_to_imgfolder()
end

# tags
def get_tags()
  db = connect_to_db()
  tags = db.execute("SELECT * FROM tags")
  return tags
end

p "model.rb loaded"