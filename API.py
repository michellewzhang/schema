# Copyright Carnegie Mellon University 2020 Michelle Zhang. 

import tornado.ioloop
import tornado.web
import json
import random
import requests

dialogs = {}
startMessages = {}

# generates the next response
def reply(history, userid):
    thisdialog = dialogs[userid]
    formattedHistory = ''.join([["[User] ", "[Agent] "][int(i % 2)] + e["message"] + " [SEP] " for i,e in enumerate(history)] ).strip()
    replies = thisdialog["replies"]
    if len(history) == 0:
        start = startMessages[userid]
        return replies[start]

    rres = requests.post('http://shikib.sp.cs.cmu.edu:8886/', json={'schema': thisdialog, 'dialog': formattedHistory})
    print(thisdialog, formattedHistory, rres.text)
    return rres.text
    
class SchemaHandler(tornado.web.RequestHandler):
  def set_default_headers(self):
    self.set_header("Access-Control-Allow-Origin", "*")
    self.set_header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    self.set_header('Access-Control-Allow-Methods', 'POST, OPTIONS')

  def options(self):
    pass

  # take in the schema
  def post(self):
    body = json.loads(self.request.body.decode())
    # title = body["task"]
    # graph = body["graph"]
    # replies = body["replies"]
    start = body["start"]
    userID = body["userID"]
    global startMessages
    startMessages[userID] = start
    global dialogs 
    dialogs[userID] = body

class ResponseHandler(tornado.web.RequestHandler):
  def set_default_headers(self):
    self.set_header("Access-Control-Allow-Origin", "*")
    self.set_header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    self.set_header('Access-Control-Allow-Methods', 'POST, OPTIONS')

  def options(self):
     pass

  def post(self):
    # take in full message history
    body = json.loads(self.request.body.decode())

    # return next message bassed on message history
    msg = reply(body["messages"], body["userID"])
    self.write(msg)

def make_app():
  return tornado.web.Application([
    (r"/", SchemaHandler),
    (r"/reply",ResponseHandler)
  ])

if __name__ == "__main__":
  app = make_app()
  app.listen(8899)
  tornado.ioloop.IOLoop.current().start()
