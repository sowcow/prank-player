module See
  module_function
  with_question_mark = []

  with_question_mark.push \
  def new_entry bro, text
    bro.div class: 'new-entries-item', text: text
  end

  with_question_mark.each { |name|
    define_method "#{name}?" do |*a|
      public_send(name, *a).exist?
    end
  }
end
