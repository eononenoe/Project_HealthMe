package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.entity.Order;
import com.example.healthme.domain.approval.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<Order> getOrdersByUserid(String userid) {
        return orderRepository.findByUserid(userid);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }
}
