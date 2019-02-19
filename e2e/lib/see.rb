module See
  module_function
  with_question_mark = []

  with_question_mark.push \
  def new_button bro, text
    bro.button text: text
  end

  with_question_mark.each { |name|
    define_method "#{name}?" do |*a|
      public_send(name, *a).exist?
    end
  }
end
