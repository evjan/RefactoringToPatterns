class XmlGenerator
  def generate_xml(orders)
    xml = ""
  
    xml << "<orders>"
  
    orders.each do |order|
      xml << "<order"
      xml << " id="
      xml << order.id.to_s
      xml << ">"
  
      order.products.each do |product|
        xml << "<product"
        xml << " id="
        xml << product.id.to_s
        xml << " color='"
        xml << color_for(product)
        xml << "'"      
    
        if(product.size != ProductSize::NOT_APPLICABLE)
          xml << " size="
          xml << size_for(product)
        end
  
        xml << ">"
        xml << "<price"
        xml << " currency='"
        xml << currency_for(product)
        xml << "'>"
        xml << product.price
        xml << "</price>"
        xml << product.name
        xml << "</product>"
      end
      
    
      xml << "</order>"
    end
    xml << "</orders>"
  
    xml
  end
  
  def color_for(product)
    "green"
  end
  
  def currency_for(product)
    "AUD"
  end

  def size_for(product)
    "#{product.size}ml"
  end  
end

class ProductSize
  NOT_APPLICABLE = "350"
end