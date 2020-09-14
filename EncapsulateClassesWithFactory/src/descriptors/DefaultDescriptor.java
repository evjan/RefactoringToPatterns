package descriptors;

import java.lang.reflect.Type;

public class DefaultDescriptor extends AttributeDescriptor {
    public DefaultDescriptor(String name, Class klass, Type type) {
        super(name, klass, type);
    }
}
