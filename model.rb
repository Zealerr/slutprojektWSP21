def connect_to_db()
  db = SQLite3::Database.new('db/blog.db')
  db.results_as_hash = true
  return db
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
      session[:user] = {
        username: username,
        userId: id,
        pwDigest: db_pwdigest
      }
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

# post crud
def new_project()
end
def delete_project()
end
def update_project()
end
def get_project(userId, projectTitle)
end

def attach_tags_to_project()
end
def detach_tags_from_project()
end


# post crud
def new_post(userId, project, title, desc, content, date, isPublic, isDraft)
  db = connect_to_db()
  project = db.execute("SELECT * FROM projects WHERE projectTitle=?", project).first
  projectId = project["projectId"]
  db.execute("INSERT INTO posts (postTitle, postDesc, postDate, postContent, postIsDraft, postIsPublic, projectId) VALUES (?,?,?,?,?,?,?)", title, desc, date, content, isDraft, isPublic, projectId)
end
def delete_post()
end
def update_post()
end
def get_post(postTitle)
  db = connect_to_db()
  post = db.execute("SELECT * FORM posts WHERE postTitle=?", postTitle)
  return post
end

def attach_tags_to_post()
end
def detach_tags_from_post()
end

# upload img to img folder
def img_to_imgfolder()
end


p "model.rb loaded"