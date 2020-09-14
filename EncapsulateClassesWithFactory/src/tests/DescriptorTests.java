package tests;

import descriptors.AttributeDescriptor;
import descriptors.ClientCode;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DescriptorTests {
    @Test
    void addition() {
        var clientCode = new ClientCode();
        List<AttributeDescriptor> result = clientCode.createAttributeDescriptors();

        assertEquals("remoteId", result.get(0).toString());
        assertEquals("createdDate", result.get(1).toString());
        assertEquals("lastChangedDate", result.get(2).toString());
        assertEquals("createdBy", result.get(3).toString());
        assertEquals("lastChangedBy", result.get(4).toString());
        assertEquals("optimisticLockVersion", result.get(5).toString());
    }
}
