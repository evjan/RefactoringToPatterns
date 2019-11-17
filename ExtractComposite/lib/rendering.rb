class Node
  def to_plain_text_string
  end
end

class Tag
  def to_plain_text_string

  end
end

class FormTag
  def to_plain_text_string
    text_contents = ""
    elements = all_nodes_vector.elements

    elements.each do |node|
      text_contents << node.to_plain_text_string
    end

    text_contents
  end
end

class LinkTag
  def to_plain_text_string
    sb = ""
    elements = link_data.elements

    elements.each do |node|
      sb << node.to_plain_text_string
    end

    sb
  end
end
