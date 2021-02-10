require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'
enable :sessions


def testUser()
    #temp user logged in
    user = {
        username: "Admin",
        userId: 1
    }
    session[:user] = user
end

get ('/') do #temp create projects
    testUser()
    redirect('/new/post')
end

get ('/projects') do
    slim(:"projects/create")
end

get ('/new/post') do
    testUser()
    db = SQLite3::Database.new('db/blog.db')
    db.results_as_hash = true
    projects = db.execute("SELECT * FROM projects WHERE userId=?", session[:user][:userId])
    projectTitles = []
    projects.each do |project|
        projectTitles << project["projectTitle"]
    end
    slim(:"posts/create", locals:{projectTitles: projectTitles})
end

post ('/posts/create') do

end
