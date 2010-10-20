# -*- coding: utf-8 -*-
class Student < ActiveRecord::Base
  validates :name, :presence => true
  validates :yomi, :presence => true
  scope :grade, lambda{|grade|
    where('grade like ?', "#{grade}%")
  }
end
